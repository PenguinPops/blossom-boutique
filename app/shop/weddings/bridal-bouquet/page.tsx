import ProductPage from '@/app/components/ProductPage';

export default function BridalBouquetPage() {
  return (
    <ProductPage
      name="Bridal Bouquet"
      description="A breathtaking bouquet tailored to make your wedding day unforgettable."
      image="/images/bridal-bouquet.jpg"
      price="$99.99"
      details={[
        "Customizable floral arrangement",
        "Designed to match your wedding theme",
        "Includes a keepsake ribbon wrap",
        "Care instructions provided",
      ]}
    />
  );
}
