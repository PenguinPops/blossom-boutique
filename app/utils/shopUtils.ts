// app/lib/shop-utils.ts
import { eq } from 'drizzle-orm';
import { ensureProductCategoryTable, ensureProductTable } from '@/app/db';
import { db } from '@/app/db';

// Helper function to fetch a category by slug
async function fetchCategoryBySlug(categorySlug: string) {
  const ProductCategory = await ensureProductCategoryTable();
  const category = await db
    .select()
    .from(ProductCategory)
    .where(eq(ProductCategory.slug, categorySlug))
    .limit(1)
    .execute();
  return category[0] || null;
}

// Helper function to fetch products by category ID
async function fetchProductsByCategoryId(categoryId: number) {
  const Product = await ensureProductTable(); 
  const products = await db
    .select()
    .from(Product)
    .where(eq(Product.categoryid, categoryId))
    .execute();
  return products;
}

// Main function to get category and associated products
export async function getCategoryData(categorySlug: string) {
  const category = await fetchCategoryBySlug(categorySlug);
  if (!category) {
    throw new Error(`Category with slug '${categorySlug}' not found`);
  }
  const products = await fetchProductsByCategoryId(category.id);
  return { category, products };
}