// app/shop/[category]/[product]/page.tsx
import { getCategoryData } from '@/app/api/shop/[category]/route';
import ProductPage from '@/app/components/ProductPage';
import Layout from '@/app/components/Layout';

export default async function Product({ params }: { params: { category: string; product: string } }) {
  const { category, product } = params;

  try {
    // Fetch category data and associated products
    const { category: categoryData, products } = await getCategoryData(category);

    if (!categoryData) {
      return <div>Category not found</div>;
    }

    const productData = products.find(
      (prod) => (prod.name && prod.name.toLowerCase().replace(/ /g, '-') === product)
    );

    if (!productData) {
      return <div>Product not found</div>;
    }

    // Wrap the ProductPage inside the Layout component
    return (
        <Layout>
        <ProductPage
            id={productData.id || 0} // Provide a fallback for null
            name={productData.name || "Unnamed Product"} // Provide a fallback for null
            description={productData.description || "No description available."}
            image={productData.image || "/images/default-product.jpg"} // Default image
            price={productData.price ? `$${productData.price}` : "Price not available"} // Handle null price
            // details={productData.details || []} // Default to an empty array
        />
        </Layout>

    );
  } catch (error) {
    return <div>Error fetching product data: {error instanceof Error ? error.message : 'Unknown error'}</div>;
  }
}
