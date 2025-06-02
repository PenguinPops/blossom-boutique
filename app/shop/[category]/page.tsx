import { getCategoryData } from '@/app/utils/shopUtils';
import CategoryPage from '@/app/components/CategoryPage';

export default async function Category({ params }: { params: { category: string } }) {
  const { category } = params;

  try {
    // Fetch category data and associated products
    const { category: categoryData, products } = await getCategoryData(category);

    if (!categoryData) {
      return <div>Category not found</div>;
    }

    // Map and filter products to ensure only valid Product objects are passed
    const formattedProducts = products
      .filter((prod) => prod.name) // Filter out products where name is null
      .map((prod) => ({
        id: prod.id,
        name: prod.name!,
        description: prod.description || '',
        image: prod.image || '/images/default-product.jpg',
        link: `/shop/${categoryData.slug}/${(prod.name || 'unknown-product')
          .toLowerCase()
          .replace(/ /g, '-')}`,
      }));

    // Pass the category data and formatted products to CategoryPage component
    return (
      <CategoryPage
        title={categoryData.name || 'Unnamed Category'}
        description={categoryData.description || 'No description available.'}
        heroImage={categoryData.image || '/images/default-hero.jpg'}
        products={formattedProducts}
      />
    );
  } catch (error) {
    return <div>Error fetching category data: {error instanceof Error ? error.message : 'Unknown error'}</div>;
  }
}
