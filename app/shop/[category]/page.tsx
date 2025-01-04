// app/shop/[category]/page.tsx
import { getCategoryData } from '@/app/api/shop/[category]/route';
import CategoryPage from '@/app/components/CategoryPage';

export default async function Category({ params }: { params: { category: string } }) {
  const { category } = params;

  try {
    // Fetch category data and associated products
    const { category: categoryData, products } = await getCategoryData(category);

    if (!categoryData) {
      return <div>Category not found</div>;
    }

    // Pass the category data and products to CategoryPage component
    return (
      <CategoryPage
        title={categoryData.name}
        description={categoryData.description}
        heroImage={categoryData.image}
        products={products.map((prod) => ({
          id: prod.id,
          name: prod.name,
          description: prod.description,
          image: prod.image,
          link: `/shop/${categoryData.slug}/${prod.name.toLowerCase().replace(/ /g, '-')}`,
        }))}
      />
    );
  } catch (error) {
    return <div>Error fetching category data: {error instanceof Error ? error.message : 'Unknown error'}</div>;
  }
}
