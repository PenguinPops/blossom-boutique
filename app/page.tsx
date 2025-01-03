import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import Layout from '@/app/components/Layout';
import { RiFlowerLine } from "react-icons/ri";

const Page = () => {
  return (
    <Layout>
      <div className="h-screen relative text-gray-200">
        {/* Fullscreen Background */}
        <div
          className="h-full w-full bg-cover bg-center absolute top-0 left-0"
          style={{ backgroundImage: 'url(/images/rosesbgfull.jpg)' }}
        ></div>

        {/* Overlay */}
        <div className="h-full w-full bg-black bg-opacity-40 absolute top-0 left-0"></div>

        {/* Centered Content */}
        <div className="h-full flex flex-col justify-center items-center relative z-10">
          <RiFlowerLine className="scale-150 mb-6" />

          <h1 className="text-6xl font-bold mb-6 text-shadow">Blossom Boutique</h1>

          <Link legacyBehavior href="/shop">
            <a
              className="text-2xl text-white opacity-75 flex items-center gap-2 hover:opacity-100 hover:bg-red-600 px-4 py-2 rounded transition duration-300"
            >
              Discover Our Collection <FaArrowRight />
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Page;
