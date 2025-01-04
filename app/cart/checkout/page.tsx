"use client";

import React, { useState } from "react";
import Layout from "@/app/components/Layout"; // Assuming Layout contains footer

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const CheckoutPage: React.FC = () => {
  const [cartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Rose Bouquet",
      price: 29.99,
      quantity: 2,
    },
    {
      id: "2",
      name: "Wedding Arrangement",
      price: 59.99,
      quantity: 1,
    },
  ]);

  const [userDetails, setUserDetails] = useState({
    name: "",
    surname: "",
    postalCode: "",
    address: "",
    country: "",
    voivodeship: "",
    phoneNumber: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePlaceOrder = () => {
    const { name, surname, postalCode, address, country, voivodeship, phoneNumber } = userDetails;

    if (!name || !surname || !postalCode || !address || !country || !voivodeship || !phoneNumber) {
      alert("Please fill out all fields before placing the order.");
      return;
    }

    alert(`Order placed successfully!\nThank you, ${name} ${surname}.`);
    // Implement actual order functionality here
  };

  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Layout>
      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-5 mt-20">
        <h1 className="text-3xl font-bold text-gray-800 mb-5">Checkout</h1>

        {/* User Details */}
        <div className="bg-gray-100 p-5 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Details</h2>
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userDetails.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label htmlFor="surname" className="block text-gray-700 font-medium">
                  Surname
                </label>
                <input
                  type="text"
                  id="surname"
                  name="surname"
                  value={userDetails.surname}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Enter your surname"
                />
              </div>
              <div>
                <label htmlFor="postalCode" className="block text-gray-700 font-medium">
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={userDetails.postalCode}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Enter your postal code"
                />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-gray-700 font-medium">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={userDetails.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="address" className="block text-gray-700 font-medium">
                Address Line
              </label>
              <textarea
                id="address"
                name="address"
                value={userDetails.address}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter your address"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label htmlFor="country" className="block text-gray-700 font-medium">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={userDetails.country}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Enter your country"
                />
              </div>
              <div>
                <label htmlFor="voivodeship" className="block text-gray-700 font-medium">
                  Voivodeship
                </label>
                <input
                  type="text"
                  id="voivodeship"
                  name="voivodeship"
                  value={userDetails.voivodeship}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Enter your voivodeship"
                />
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-5 mt-5 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
          <ul className="divide-y divide-gray-300">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between items-center py-3">
                <span className="text-gray-800">{item.name} (x{item.quantity})</span>
                <span className="text-gray-600">${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <p className="text-right mt-4 text-xl font-bold text-gray-800">
            Total: ${getTotalPrice().toFixed(2)}
          </p>
        </div>

        {/* Place Order Button */}
        <button
          onClick={handlePlaceOrder}
          className="mt-5 w-full px-6 py-3 bg-teal-700 text-white text-lg rounded-lg hover:bg-teal-800 transition"
        >
          Place Order
        </button>
      </div>

      {/* Footer (Part of Layout) */}
      <footer className="bg-gray-200 py-5 text-center mt-10">
        <p className="text-gray-600">&copy; 2025 Blossom Boutique. All rights reserved.</p>
      </footer>
    </Layout>
  );
};

export default CheckoutPage;
