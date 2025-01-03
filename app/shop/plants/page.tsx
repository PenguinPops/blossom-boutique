import CategoryPage from '@/app/components/CategoryPage';

const plants = [
  {
    id: 1,
    name: 'Succulent Garden',
    description: 'Low-maintenance succulents in a stylish planter.',
    image: '/images/succulents.jpg',
    link: '/shop/plants/succulent-garden',
  },
  {
    id: 2,
    name: 'Fiddle Leaf Fig',
    description: 'A trendy plant for any modern home.',
    image: '/images/fiddle-leaf-fig.jpg',
    link: '/shop/plants/fiddle-leaf-fig',
  },
  {
    id: 3,
    name: 'Snake Plant',
    description: 'Easy to care for and air-purifying.',
    image: '/images/snake-plant.jpg',
    link: '/shop/plants/snake-plant',
  },
];

export default function PlantsPage() {
  return (
    <CategoryPage
      title="Plants"
      description="Bring life to your space with our collection of houseplants."
      heroImage="/images/plant.jpg"
      products={plants}
    />
  );
}
