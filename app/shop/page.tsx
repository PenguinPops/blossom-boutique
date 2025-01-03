import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/app/components/Layout';


const ShopPage = () => {
  return (
    
    <Layout>
      <div className="font-sans text-center p-5">
        {/* background */}

        {/* Shop Hero Section */}
        <section className="my-10 flex flex-col items-center">
          <Image
            src="/images/hero2.jpeg"
            alt="Shop Flowers"
            width={800}
            height={400}
            className="rounded-lg shadow-lg"
          />
          <p className="mt-5 text-gray-700 text-lg">
            Browse our collections to find the perfect flowers for your needs.
          </p>
        </section>

        {/* Shop Categories Section */}
        <section>
          <h2 className="text-2xl text-teal-700">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
            {/* Bouquets Section */}
            <div className="flex flex-col items-center bg-gray-100 p-5 rounded-lg shadow-lg">
              <Image
                src="/images/roses.jpg" // Replace with your image path
                alt="Bouquets"
                width={300}
                height={200}
                className="rounded"
              />
              <h3 className="mt-3 text-xl text-gray-800">Bouquets</h3>
              <p className="text-gray-600">Perfect arrangements for any occasion.</p>
              <Link legacyBehavior href="/shop/bouquets">
                <a className="mt-3 px-4 py-2 text-white bg-gray-800 rounded hover:bg-gray-900 transition">
                  Explore Bouquets
                </a>
              </Link>
            </div>

            {/* Wedding Flowers Section */}
            <div className="flex flex-col items-center bg-gray-100 p-5 rounded-lg shadow-lg">
              <Image
                src="/images/wedding.jpg" // Replace with your image path
                alt="Wedding Flowers"
                width={300}
                height={200}
                className="rounded"
              />
              <h3 className="mt-3 text-xl text-gray-800">Wedding Flowers</h3>
              <p className="text-gray-600">Make your big day unforgettable.</p>
              <Link legacyBehavior href="/shop/weddings">
                <a className="mt-3 px-4 py-2 text-white bg-gray-800 rounded hover:bg-gray-900 transition">
                  Explore Wedding Flowers
                </a>
              </Link>
            </div>

            {/* Plants Section */}
            <div className="flex flex-col items-center bg-gray-100 p-5 rounded-lg shadow-lg">
              <Image
                src="/images/plant.jpg" // Replace with your image path
                alt="Plants"
                width={300}
                height={200}
                className="rounded"
              />
              <h3 className="mt-3 text-xl text-gray-800">Plants</h3>
              <p className="text-gray-600">Add greenery to your space.</p>
              <Link legacyBehavior href="/shop/plants">
                <a className="mt-3 px-4 py-2 text-white bg-gray-800 rounded hover:bg-gray-900 transition">
                  Explore Plants
                </a>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="mt-10 bg-gray-200 py-5">
          <p className="text-gray-600">&copy; 2025 Blossom Boutique. All rights reserved.</p>
        </footer>
      </div>
    </Layout>
  );
};

export default ShopPage;