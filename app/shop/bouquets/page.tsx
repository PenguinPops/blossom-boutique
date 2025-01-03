import CategoryPage from '@/app/components/CategoryPage';

const bouquets = [
  {
    id: 1,
    name: 'Romantic Roses',
    description: 'A classic bouquet of red roses.',
    image: '/images/roses.jpg',
    link: '/shop/bouquets/romantic-roses',
  },
  {
    id: 2,
    name: 'Sunny Blooms',
    description: 'Bright yellow sunflowers to brighten your day.',
    image: '/images/sunflowers.jpg',
    link: '/shop/bouquets/sunny-blooms',
  },
  {
    id: 3,
    name: 'Elegant Lilies',
    description: 'A sophisticated arrangement of white lilies.',
    image: '/images/lilies.jpg',
    link: '/shop/bouquets/elegant-lilies',
  },
];

export default function BouquetsPage() {
  return (
    <CategoryPage
      title="Bouquets"
      description="Discover our beautiful bouquets, perfect for every occasion."
      heroImage="/images/roses.jpg"
      products={bouquets}
    />
  );
}
