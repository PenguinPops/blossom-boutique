import ProductPage from '@/app/components/ProductPage';

export default function BoutonnieresPage() {
  return (
    <ProductPage
      name="Handcrafted Boutonnieres"
      description="Handcrafted boutonnieres to complement your rustic wedding theme."
      image="/images/boutonnieres.jpg"
      price="$12.99"
      details={[
        "Made with fresh or dried flowers",
        "Includes decorative ribbon",
        "Perfect for groomsmen and the groom",
        "Care instructions provided",
      ]}
    />
  );
}
