"use client";

import React, { useState } from 'react';
import Layout from '@/app/components/Layout'; // Assuming Layout contains footer

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Rose Bouquet',
      price: 29.99,
      quantity: 2,
      image: '/images/roses.jpg',
    },
    {
      id: '2',
      name: 'Wedding Arrangement',
      price: 59.99,
      quantity: 1,
      image: '/images/wedding.jpg',
    },
  ]);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Layout>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-5 mt-20 text-black">
        <h1 className="text-3xl font-bold text-gray-800 mb-5">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-lg text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            <ul className="divide-y divide-gray-300">
              {cartItems.map((item) => (
                <li key={item.id} className="flex items-center py-5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover mr-5"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {item.name}
                    </h2>
                    <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2 text-black">
                      <label htmlFor={`quantity-${item.id}`} className="mr-2">
                        Quantity:
                      </label>
                      <input
                        id={`quantity-${item.id}`}
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.id,
                            Math.max(1, Number(e.target.value))
                          )
                        }
                        className="w-16 text-center border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="ml-5 text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-5 text-right">
              <p className="text-xl font-bold">
                Total: ${getTotalPrice().toFixed(2)}
              </p>
              <button
                onClick={() => alert('Proceeding to checkout...')}
                className="mt-3 px-6 py-3 bg-teal-700 text-white text-lg rounded-lg hover:bg-teal-800 transition"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>

      {/* Footer (Part of Layout) */}
      <footer className="bg-gray-200 py-5 text-center mt-10">
        <p className="text-gray-600">&copy; 2025 Blossom Boutique. All rights reserved.</p>
      </footer>
    </Layout>
  );
};

export default CartPage;
