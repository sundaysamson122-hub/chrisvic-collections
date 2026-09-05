import { and, desc, eq, ilike } from "drizzle-orm";
import { Router, type IRouter } from "express";
import { db, productsTable } from "@workspace/db";
import {
  CreateProductBody,
  CreateProductResponse,
  DeleteProductParams,
  ListProductsQueryParams,
  ListProductsResponse,
  UpdateProductBody,
  UpdateProductParams,
  UpdateProductResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

const starterProducts = [
  {
    name: "Satin Bow Mini Dress",
    category: "Women",
    price: 18900,
    originalPrice: 25500,
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85",
    rating: 4.9,
    reviews: 128,
    badge: "Bestseller",
    description: "A soft satin mini dress with a playful bow detail and an easy evening silhouette.",
    stock: 24,
    featured: true,
  },
  {
    name: "Cloud Knit Co-ord Set",
    category: "Women",
    price: 24500,
    originalPrice: 32000,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=85",
    rating: 4.8,
    reviews: 94,
    badge: "New drop",
    description: "A cozy ribbed knit set made for slow mornings, travel days, and everything in between.",
    stock: 18,
    featured: true,
  },
  {
    name: "Gold Bloom Drop Earrings",
    category: "Jewelry",
    price: 8500,
    originalPrice: 12000,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85",
    rating: 4.7,
    reviews: 67,
    badge: "Gift-ready",
    description: "Petal-shaped statement earrings with a soft gold finish for day-to-night styling.",
    stock: 41,
    featured: true,
  },
  {
    name: "Rosewater Glow Set",
    category: "Beauty",
    price: 16500,
    originalPrice: 21500,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=85",
    rating: 4.9,
    reviews: 212,
    badge: "Top rated",
    description: "A simple three-step self-care set with a fresh, dewy finish.",
    stock: 35,
    featured: true,
  },
  {
    name: "Ripple Glass Table Lamp",
    category: "Home",
    price: 28500,
    originalPrice: 39000,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85",
    rating: 4.6,
    reviews: 45,
    badge: "Home pick",
    description: "A sculptural glass lamp that brings a warm pool of light to your favourite corner.",
    stock: 12,
    featured: false,
  },
  {
    name: "Everyday Canvas Tote",
    category: "Accessories",
    price: 7200,
    originalPrice: 9800,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=85",
    rating: 4.8,
    reviews: 83,
    badge: "Everyday fave",
    description: "A roomy, structured tote with enough space for your daily essentials.",
    stock: 29,
    featured: false,
  },
];

let seedPromise: Promise<void> | undefined;

async function ensureSeedProducts(): Promise<void> {
  if (!seedPromise) {
    seedPromise = (async () => {
      const existing = await db.select({ id: productsTable.id }).from(productsTable).limit(1);
      if (existing.length === 0) {
        await db.insert(productsTable).values(starterProducts);
      }
    })();
  }
  await seedPromise;
}

router.get("/products", async (req, res): Promise<void> => {
  await ensureSeedProducts();
  const parsed = ListProductsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const filters = [];
  if (parsed.data.category && parsed.data.category !== "All") {
    filters.push(eq(productsTable.category, parsed.data.category));
  }
  if (parsed.data.search) {
    filters.push(ilike(productsTable.name, `%${parsed.data.search}%`));
  }
  if (parsed.data.featured !== undefined) {
    filters.push(eq(productsTable.featured, parsed.data.featured));
  }

  const products = await db
    .select()
    .from(productsTable)
    .where(filters.length ? and(...filters) : undefined)
    .orderBy(desc(productsTable.featured), desc(productsTable.id));

  res.json(ListProductsResponse.parse(products));
});

router.post("/products", async (req, res): Promise<void> => {
  const parsed = CreateProductBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [product] = await db
    .insert(productsTable)
    .values({
      ...parsed.data,
      rating: 5,
      reviews: 0,
      badge: parsed.data.badge ?? "",
    })
    .returning();
  res.status(201).json(CreateProductResponse.parse(product));
});

router.patch("/products/:id", async (req, res): Promise<void> => {
  const params = UpdateProductParams.safeParse(req.params);
  const parsed = UpdateProductBody.safeParse(req.body);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [product] = await db
    .update(productsTable)
    .set(parsed.data)
    .where(eq(productsTable.id, params.data.id))
    .returning();
  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  res.json(UpdateProductResponse.parse(product));
});

router.delete("/products/:id", async (req, res): Promise<void> => {
  const params = DeleteProductParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [product] = await db
    .delete(productsTable)
    .where(eq(productsTable.id, params.data.id))
    .returning();
  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  res.sendStatus(204);
});

export default router;