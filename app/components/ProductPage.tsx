'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ProductPageProps {
  name: string;
  description: string;
  image: string;
  price: string;
  details: string[];
}

const ProductPage: React.FC<ProductPageProps> = ({ name, description, image, price, details }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    alert(`Added ${quantity} ${name}(s) to your cart!`);
    // Implement actual cart functionality here (e.g., context, API call, etc.)
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
      <p className="text-lg text-gray-600 mt-2">{description}</p>
      <div className="mt-5">
        <Image
          src={image}
          alt={name}
          width={800}
          height={400}
          className="rounded-lg shadow-lg"
        />
      </div>
      <p className="mt-5 text-2xl text-teal-700">{price}</p>
      <ul className="mt-3 text-gray-700 list-disc list-inside">
        {details.map((detail, index) => (
          <li key={index}>{detail}</li>
        ))}
      </ul>

      {/* Quantity Selector */}
      <div className="mt-5 flex items-center space-x-4">
        <label htmlFor="quantity" className="text-gray-700 text-lg">Quantity:</label>
        <input
          id="quantity"
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
          className="w-16 text-center text-lg border border-gray-300 rounded-lg text-gray-700"
        />
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="mt-5 px-6 py-3 bg-teal-700 text-white text-lg rounded-lg hover:bg-teal-800 transition"
      >
        Add to Cart
      </button>

        {/* Back to Shop Button */}
        <button
            onClick={() => window.history.back()}
            className="ml-5 mt-5 px-6 py-3 bg-gray-700 text-white text-lg rounded-lg hover:bg-gray-800 transition"
        >
            Back to Shop
        </button>
    </div>
  );
};

export default ProductPage;
