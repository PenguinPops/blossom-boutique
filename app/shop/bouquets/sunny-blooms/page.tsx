import ProductPage from '@/app/components/ProductPage';

export default function SunnyBloomsPage() {
  return (
    <ProductPage
      name="Sunny Blooms"
      description="Brighten anyone's day with this cheerful arrangement of vibrant sunflowers."
      image="/images/sunflowers.jpg"
      price="$29.99"
      details={[
        "6 large sunflowers",
        "Wrapped in eco-friendly kraft paper",
        "Optional gift wrapping available",
        "Care instructions provided",
      ]}
    />
  );
}
