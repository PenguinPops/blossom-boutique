import ProductPage from '@/app/components/ProductPage';

export default function SucculentGardenPage() {
  return (
    <ProductPage
      name="Succulent Garden"
      description="A stylish assortment of low-maintenance succulents, perfect for any space."
      image="/images/succulents.jpg"
      price="$24.99"
      details={[
        "Includes 5 assorted succulents",
        "Arranged in a chic ceramic pot",
        "Requires minimal watering",
        "Care instructions provided",
      ]}
    />
  );
}
