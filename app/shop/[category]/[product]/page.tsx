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
      (prod) => prod.name.toLowerCase().replace(/ /g, '-') === product
    );

    if (!productData) {
      return <div>Product not found</div>;
    }

    // Wrap the ProductPage inside the Layout component
    return (
      <Layout>
        <ProductPage
          name={productData.name}
          description={productData.description}
          image={productData.image}
          price={productData.price}
          details={productData.details || []} // Assuming 'details' is available in the product data
        />
      </Layout>
    );
  } catch (error) {
    return <div>Error fetching product data: {error instanceof Error ? error.message : 'Unknown error'}</div>;
  }
}
