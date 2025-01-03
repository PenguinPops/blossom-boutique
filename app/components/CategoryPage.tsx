import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/app/components/Layout';

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  link: string;
}

interface CategoryPageProps {
  title: string;
  description: string;
  heroImage: string;
  products: Product[];
}

const CategoryPage: React.FC<CategoryPageProps> = ({
  title,
  description,
  heroImage,
  products,
}) => {
  return (
    <Layout>
      <div className="font-sans text-center p-5">
        {/* Hero Section */}
        <section className="my-10">
          <Image
            src={heroImage}
            alt={title}
            width={800}
            height={400}
            className="rounded-lg shadow-lg mx-auto"
          />
          <h1 className="mt-5 text-3xl font-bold text-teal-700">{title}</h1>
          <p className="mt-3 text-gray-700 text-lg">{description}</p>
        </section>

        {/* Products Section */}
        <section className="mt-10 mb-10">
          <h2 className="text-2xl text-teal-700">Explore {title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col justify-center items-center bg-gray-100 p-5 rounded-lg shadow-lg"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={200}
                  className="rounded"
                />
                <h3 className="mt-3 text-xl text-gray-800">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
                <Link legacyBehavior href={product.link}>
                  <a className="mt-3 px-4 py-2 text-white bg-gray-800 rounded hover:bg-gray-900 transition">
                    View Details
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* back to all categories */}
        <Link legacyBehavior href="/shop">
          <a className="mt-5 px-4 py-2 text-white bg-gray-800 rounded hover:bg-gray-900 transition">
            Back to All Categories
          </a>
        </Link>

        {/* Footer Section */}
        <footer className="mt-10 bg-gray-200 py-5">
          <p className="text-gray-600">&copy; 2025 Blossom Boutique. All rights reserved.</p>
        </footer>
      </div>
    </Layout>
  );
};

export default CategoryPage;
