import { desc, eq } from "drizzle-orm";
import { Router, type IRouter } from "express";
import { db, ordersTable, productsTable, type StoredOrderItem } from "@workspace/db";
import {
  CreateOrderBody,
  CreateOrderResponse,
  ListOrdersQueryParams,
  ListOrdersResponse,
  UpdateOrderBody,
  UpdateOrderParams,
  UpdateOrderResponse,
} from "@workspace/api-zod";
import { notifyTelegramOrder } from "../lib/telegram";

const router: IRouter = Router();

function serializeOrder(order: typeof ordersTable.$inferSelect) {
  return {
    ...order,
    items: order.items as StoredOrderItem[],
    createdAt: order.createdAt.toISOString(),
  };
}

router.get("/orders", async (req, res): Promise<void> => {
  const parsed = ListOrdersQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const orders = await db
    .select()
    .from(ordersTable)
    .where(parsed.data.status ? eq(ordersTable.status, parsed.data.status) : undefined)
    .orderBy(desc(ordersTable.createdAt));
  res.json(ListOrdersResponse.parse(orders.map(serializeOrder)));
});

router.post("/orders", async (req, res): Promise<void> => {
  const parsed = CreateOrderBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [order] = await db
    .insert(ordersTable)
    .values({
      ...parsed.data,
      paymentReceipt: parsed.data.paymentReceipt ?? null,
      customerImage: parsed.data.customerImage ?? null,
      status: "pending",
    })
    .returning();

  void notifyTelegramOrder({
    id: order.id,
    customerName: order.customerName,
    email: order.email,
    phone: order.phone,
    location: order.location,
    paymentMethod: order.paymentMethod,
    paymentReceipt: order.paymentReceipt,
    total: order.total,
    items: order.items as StoredOrderItem[],
  });

  res.status(201).json(CreateOrderResponse.parse(serializeOrder(order)));
});

router.patch("/orders/:id", async (req, res): Promise<void> => {
  const params = UpdateOrderParams.safeParse(req.params);
  const parsed = UpdateOrderBody.safeParse(req.body);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [order] = await db
    .update(ordersTable)
    .set({ status: parsed.data.status })
    .where(eq(ordersTable.id, params.data.id))
    .returning();
  if (!order) {
    res.status(404).json({ error: "Order not found" });
    return;
  }
  res.json(UpdateOrderResponse.parse(serializeOrder(order)));
});

export default router;