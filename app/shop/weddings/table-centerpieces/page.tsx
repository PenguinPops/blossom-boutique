import ProductPage from '@/app/components/ProductPage';

export default function TableCenterpiecesPage() {
  return (
    <ProductPage
      name="Table Centerpieces"
      description="Elegant table centerpieces designed to enhance your wedding reception."
      image="/images/table-centerpiece.jpg"
      price="$59.99"
      details={[
        "Customizable arrangements for wedding themes",
        "Includes a stylish decorative vase",
        "Perfect for reception and dinner tables",
        "Care instructions provided",
      ]}
    />
  );
}
