"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Use the new Next.js navigation
import Layout from '@/app/components/Layout'; // Assuming Layout contains footer

interface OrderDetail {
  orderId: number;
  userId: number;
  total: number;
  productId: number;
  quantity: number;
  productName: string;
  productPrice: number;
  productImage: string; // Add the image URL to the interface
}

const OrderPage: React.FC = () => {
  const { username, orderid } = useParams(); // Fetch params from the URL
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await fetch(`/api/orders/${username}/${orderid}`);
        if (!res.ok) {
          throw new Error('Failed to fetch order details');
        }
        const data = await res.json();
        setOrderDetails(data);
      } catch (err: unknown) {
        // Check if the error is an instance of Error
        if (err instanceof Error) {
          setError(err.message); // Safely access 'message' property
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    if (username && orderid) {
      fetchOrderDetails();
    }
  }, [username, orderid]);

  const getTotalPrice = () =>
    orderDetails.reduce((total, item) => total + item.productPrice * item.quantity, 0);

  return (
    <Layout>
      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-5 mt-20 text-black">
        <h1 className="text-3xl font-bold text-gray-800 mb-5">Order #{orderid}</h1>

        {loading ? (
          <p className="text-lg text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-lg text-red-600">{error}</p>
        ) : orderDetails.length === 0 ? (
          <p className="text-lg text-gray-600">No products in this order.</p>
        ) : (
          <>
            <ul className="divide-y divide-gray-300">
              {orderDetails.map((item) => (
                <li key={item.productId} className="flex items-center py-5">
                  <div className="flex-1">
                    {/* Display product image */}
                    {item.productImage && (
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="w-20 h-20 object-cover mr-4"
                      />
                    )}
                    <h2 className="text-xl font-semibold text-gray-800">{item.productName}</h2>
                    <p className="text-gray-600">Price: ${item.productPrice.toFixed(2)}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-5 text-right">
              <p className="text-xl font-bold">
                Total: ${getTotalPrice().toFixed(2)}
              </p>
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

export default OrderPage;
