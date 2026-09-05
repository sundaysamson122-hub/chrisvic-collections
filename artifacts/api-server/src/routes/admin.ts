import { count, eq } from "drizzle-orm";
import { Router, type IRouter } from "express";
import { db, ordersTable, productsTable } from "@workspace/db";
import { GetAdminSummaryResponse } from "@workspace/api-zod";
import { requireAdmin } from "../middlewares/adminAuthorization";

const router: IRouter = Router();

router.get("/admin/summary", requireAdmin, async (_req, res): Promise<void> => {
  const [{ totalProducts }] = await db.select({ totalProducts: count() }).from(productsTable);
  const [{ totalOrders }] = await db.select({ totalOrders: count() }).from(ordersTable);
  const [{ pendingOrders }] = await db
    .select({ pendingOrders: count() })
    .from(ordersTable)
    .where(eq(ordersTable.status, "pending"));
  const orders = await db.select({ total: ordersTable.total }).from(ordersTable);
  const revenue = orders.reduce((sum, order) => sum + order.total, 0);

  res.json(
    GetAdminSummaryResponse.parse({
      totalProducts,
      totalOrders,
      pendingOrders,
      revenue,
    }),
  );
});

export default router;