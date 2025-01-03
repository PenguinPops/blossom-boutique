import ProductPage from '@/app/components/ProductPage';

export default function SnakePlantPage() {
  return (
    <ProductPage
      name="Snake Plant"
      description="A sleek and hardy indoor plant that purifies the air and adds a modern touch to any room."
      image="/images/snake-plant.jpg"
      price="$19.99"
      details={[
        "Height: 12-16 inches",
        "Comes in a minimalist ceramic pot",
        "Low light and water requirements",
        "Care instructions included",
      ]}
    />
  );
}
