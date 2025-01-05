import Link from 'next/link';
import { ReactNode } from 'react';
import { RiFlowerLine } from "react-icons/ri";
import { FaShoppingCart, FaUser, FaStore } from 'react-icons/fa';

import { useSession } from 'next-auth/react';

const Navbar = () => {
  return (
    <nav className="flex justify-center space-x-6">
      {/* Shop Link */}
      <Link legacyBehavior href="/shop">
        <a className="flex items-center text-lg mx-4 text-white hover:text-red-400 transition">
          <FaStore className="mr-2" />
          Shop
        </a>
      </Link>

      {/* Cart Link */}
      <Link legacyBehavior href="/cart">
        <a className="flex items-center text-lg mx-4 text-white hover:text-red-400 transition">
          <FaShoppingCart className="mr-2" />
          Cart
        </a>
      </Link>

      {/* Account Link */}
      <Link legacyBehavior href="/account">
        <a className="flex items-center text-lg mx-4 text-white hover:text-red-400 transition">
          <FaUser className="mr-2" />
          Account
        </a>
      </Link>
    </nav>
  );
};

interface LayoutProps {
  children: ReactNode; // children will hold the page-specific content
}

const Layout = ({ children }: LayoutProps) => {
  return (
    
    <div className="relative min-h-screen text-gray-100 style={{ backgroundImage: 'url(/images/rosesbgfull.jpg)' }}">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 w-full bg-black bg-opacity-50 py-4 px-8 flex justify-between items-center z-10">
        <Link legacyBehavior href="/">
          <div className="flex flex-row align-middle text-gray-100 hover:text-red-400 transition cursor-pointer">
            <RiFlowerLine className="mt-2 mr-2"/>
            <h1 className="text-2xl font-bold text-white">Blossom Boutique</h1>
          </div>
        </Link>
        <Navbar />
      </header>

      {/* Main Content Area */}
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
};

export default Layout;
