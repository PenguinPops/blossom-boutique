import ProductPage from '@/app/components/ProductPage';

export default function FiddleLeafFig() {
  return (
    <ProductPage
      name="Fiddle Leaf Fig"
      description="Lush, vibrant fiddle leaf figs perfect for enhancing your home's natural vibe."
      image="/images/fiddle-leaf-fig.jpg"
      price="$14.99"
      details={[
        "Comes in a hanging basket or pot",
        "Thrives in indirect sunlight",
        "Requires moderate watering",
        "Care instructions included",
      ]}
    />
  );
}
