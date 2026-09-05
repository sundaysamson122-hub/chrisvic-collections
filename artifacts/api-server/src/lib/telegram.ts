import { Buffer } from "node:buffer";
import { ReplitConnectors } from "@replit/connectors-sdk";
import type { StoredOrderItem } from "@workspace/db";
import { logger } from "./logger";

const connectors = new ReplitConnectors();
const TELEGRAM_MESSAGE_LIMIT = 4096;
const MAX_RECEIPT_BYTES = 10 * 1024 * 1024;

type TelegramOrder = {
  id: number;
  customerName: string;
  email: string;
  phone: string;
  location: string;
  paymentMethod: string;
  paymentReceipt: string | null;
  total: number;
  items: StoredOrderItem[];
};

type TelegramUpdate = {
  message?: { chat?: { id?: number | string } };
  channel_post?: { chat?: { id?: number | string } };
};

async function telegramRequest<T>(
  path: string,
  options?: { method?: string; body?: unknown },
): Promise<T> {
  const response = await connectors.proxy("telegram", path, {
    method: options?.method ?? "GET",
    body: options?.body,
  });
  const payload = (await response.json()) as { ok?: boolean; result?: T; description?: string };
  if (!response.ok || !payload.ok) {
    throw new Error(payload.description ?? `Telegram request failed with ${response.status}`);
  }
  return payload.result as T;
}

async function resolveChatId(): Promise<string | null> {
  if (process.env.TELEGRAM_CHAT_ID?.trim()) {
    return process.env.TELEGRAM_CHAT_ID.trim();
  }

  const updates = await telegramRequest<TelegramUpdate[]>("/getUpdates?limit=100");
  for (const update of [...updates].reverse()) {
    const chatId = update.message?.chat?.id ?? update.channel_post?.chat?.id;
    if (chatId !== undefined) return String(chatId);
  }
  return null;
}

function formatOrderMessage(order: TelegramOrder): string {
  const itemLines = order.items.map(
    (item) =>
      `• ${item.quantity} × ${item.name}\n  ${item.price} NGN each\n  Image: ${item.image || "not available"}`,
  );
  const message = [
    `ADODO COLLECTIONS — NEW ORDER #${String(order.id).padStart(4, "0")}`,
    "",
    "CUSTOMER",
    `Name: ${order.customerName}`,
    `Email: ${order.email}`,
    `Phone: ${order.phone}`,
    `Location: ${order.location}`,
    "",
    "ITEMS",
    ...itemLines,
    "",
    `TOTAL: ${order.total} NGN`,
    `PAYMENT: ${order.paymentMethod === "cash_on_delivery" ? "Cash on delivery" : "Zenith Bank transfer"}`,
    `RECEIPT: ${order.paymentReceipt ? "Uploaded" : "Not provided"}`,
  ].join("\n");

  return message.length > TELEGRAM_MESSAGE_LIMIT
    ? `${message.slice(0, TELEGRAM_MESSAGE_LIMIT - 30)}\n\n[Message truncated]`
    : message;
}

async function sendReceipt(chatId: string, receipt: string): Promise<void> {
  if (receipt.startsWith("http://") || receipt.startsWith("https://")) {
    await telegramRequest("/sendDocument", {
      method: "POST",
      body: { chat_id: chatId, document: receipt },
    });
    return;
  }

  const match = receipt.match(/^data:([^;,]+)?(?:;base64)?,(.*)$/s);
  if (!match) return;

  const content = Buffer.from(decodeURIComponent(match[2]), "base64");
  if (content.byteLength > MAX_RECEIPT_BYTES) {
    logger.warn({ size: content.byteLength }, "Telegram receipt skipped because it is too large");
    return;
  }

  const form = new FormData();
  form.append("chat_id", chatId);
  form.append(
    "document",
    new Blob([content], { type: match[1] ?? "application/octet-stream" }),
    `adodo-order-receipt-${Date.now()}`,
  );
  await telegramRequest("/sendDocument", { method: "POST", body: form });
}

export async function notifyTelegramOrder(order: TelegramOrder): Promise<void> {
  try {
    const chatId = await resolveChatId();
    if (!chatId) {
      logger.warn(
        "Telegram order notification skipped: set TELEGRAM_CHAT_ID or send a message to the connected bot first",
      );
      return;
    }

    await telegramRequest("/sendMessage", {
      method: "POST",
      body: { chat_id: chatId, text: formatOrderMessage(order) },
    });

    for (const item of order.items.slice(0, 10)) {
      if (!item.image) continue;
      await telegramRequest("/sendPhoto", {
        method: "POST",
        body: {
          chat_id: chatId,
          photo: item.image,
          caption: `${item.quantity} × ${item.name} · ${item.price} NGN each`,
        },
      });
    }

    if (order.paymentReceipt) {
      await sendReceipt(chatId, order.paymentReceipt);
    }

    logger.info({ orderId: order.id }, "Telegram order notification sent");
  } catch (error) {
    logger.error({ err: error, orderId: order.id }, "Telegram order notification failed");
  }
}