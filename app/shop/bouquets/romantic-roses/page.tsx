import ProductPage from '@/app/components/ProductPage';

export default function RomanticRosesPage() {
  return (
    <ProductPage
      name="Romantic Roses"
      description="A timeless bouquet of stunning red roses, perfect for expressing your love."
      image="/images/roses.jpg"
      price="$39.99"
      details={[
        "12 long-stemmed red roses",
        "Comes with a decorative vase",
        "Includes a personalized message card",
        "Care instructions provided",
      ]}
    />
  );
}
