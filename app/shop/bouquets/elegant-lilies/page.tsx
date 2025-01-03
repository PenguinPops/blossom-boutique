import ProductPage from '@/app/components/ProductPage';

export default function ElegantLiliesPage() {
  return (
    <ProductPage
      name="Elegant Lilies"
      description="Sophisticated and timeless, this arrangement of white lilies is perfect for any occasion."
      image="/images/lilies.jpg"
      price="$34.99"
      details={[
        "8 premium white lilies",
        "Includes a decorative vase",
        "Complimentary message card included",
        "Care instructions provided",
      ]}
    />
  );
}
