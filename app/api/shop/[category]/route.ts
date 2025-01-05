// app/shop/[category]/route.ts
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import { ensureProductCategoryTable, ensureProductTable, ensureProductDetailTable} from '@/app/db'; // Import db and table functions

const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);



// Helper function to fetch a category by slug
async function fetchCategoryBySlug(categorySlug: string) {
 
    const ProductCategory = await ensureProductCategoryTable();


  const category = await db
    .select()
    .from(ProductCategory)
    .where(eq(ProductCategory.slug, categorySlug))
    .limit(1)
    .execute();

  return category[0] || null; // Return null if category is not found
}

// Helper function to fetch products by category ID
async function fetchProductsByCategoryId(categoryId: number) {
    const Product = await ensureProductTable(); 
  const products = await db
    .select()
    .from(Product)
    .where(eq(Product.categoryid, categoryId)) // Use the correct field to filter by category ID
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

// Helper function to fetch product details
// async function fetchProductDetails(productId: number) {
//     const ProductDetail = await ensureProductDetailTable();
  
//     const details = await db
//       .select()
//       .from(ProductDetail)
//       .where(eq(ProductDetail.product_id, productId))
//       .execute();
  
//     return details.map(detail => detail.description);
//   }
  