import CategoryPage from '@/app/components/CategoryPage';

const weddingFlowers = [
  {
    id: 1,
    name: 'Bridal Bouquet',
    description: 'The perfect bouquet for the bride.',
    image: '/images/bridal-bouquet.jpg',
    link: '/shop/weddings/bridal-bouquet',
  },
  {
    id: 2,
    name: 'Table Centerpieces',
    description: 'Elegant floral arrangements for your tables.',
    image: '/images/table-centerpiece.jpg',
    link: '/shop/weddings/table-centerpieces',
  },
  {
    id: 3,
    name: 'Boutonnieres',
    description: 'Charming floral accents for the groom and groomsmen.',
    image: '/images/boutonnieres.jpg',
    link: '/shop/weddings/boutonnieres',
  },
];

export default function WeddingsPage() {
  return (
    <CategoryPage
      title="Wedding Flowers"
      description="Make your special day unforgettable with our wedding flowers."
      heroImage="/images/wedding.jpg"
      products={weddingFlowers}
    />
  );
}
