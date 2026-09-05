import { createInsertSchema } from "drizzle-zod";
import { boolean, integer, pgTable, real, serial, text } from "drizzle-orm/pg-core";
import { z } from "zod/v4";

export const productsTable = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  price: real("price").notNull(),
  originalPrice: real("original_price").notNull(),
  image: text("image").notNull(),
  rating: real("rating").notNull().default(4.8),
  reviews: integer("reviews").notNull().default(0),
  badge: text("badge").notNull().default(""),
  description: text("description").notNull().default(""),
  stock: integer("stock").notNull().default(0),
  featured: boolean("featured").notNull().default(false),
});

export const insertProductSchema = createInsertSchema(productsTable).omit({ id: true });
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof productsTable.$inferSelect;