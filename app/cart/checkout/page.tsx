"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/app/components/Layout";
import { useSession } from "next-auth/react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const CheckoutPage: React.FC = () => {
  const { data: session } = useSession(); // Get the session data
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [userDetails, setUserDetails] = useState({
    name: "",
    surname: "",
    postalCode: "",
    address: "",
    country: "",
    voivodeship: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Function to retrieve cart from cookie
  useEffect(() => {
    const cartCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("cart="));
    if (cartCookie) {
      try {
        const parsedCart = JSON.parse(decodeURIComponent(cartCookie.split("=")[1]));
        setCartItems(parsedCart);
      } catch (error) {
        console.error("Error parsing cart cookie:", error);
        setCartItems([]);
      }
    }
  }, []);

  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate each input field
    if (!/^[A-ZŻŹĄĆÓŁŃŚ][a-ząłóżśźć]+(\s?-?[A-ZŻŹĄĆÓŁŃŚ][a-ząłóżśźć]+)*$/.test(userDetails.name)) {
      newErrors.name = "Name is required.";
    }

    if (!/^[A-ZŻŹĄĆÓŁŃŚ][a-ząłóżśźć]+(\s?-?[A-ZŻŹĄĆÓŁŃŚ][a-ząłóżśźć]+)*$/gm.test(userDetails.surname)) {
      newErrors.surname = "Surname is required.";
    }

    const postalCodeRegex = /^[0-9]{2}-[0-9]{3}$/;
    if (!postalCodeRegex.test(userDetails.postalCode)) {
      newErrors.postalCode = "Invalid postal code.";
    }

    // if (!/^[A-Za-zÀ-ž0-9\s,]+$/.test(userDetails.address)) {
    //   newErrors.address = "Address is required.";
    // }

    if (!/^[A-Za-zÀ-ž\s]+$/.test(userDetails.country)) {
      newErrors.country = "Country is required.";
    }

    if (!/^[A-Za-zÀ-ž]+$/.test(userDetails.voivodeship)) {
      newErrors.voivodeship = "Voivodeship is required.";
    }

    const phoneRegex = /^(\+\d\d)?[0-9]{9}$/;
    if (!phoneRegex.test(userDetails.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number.";
    }

    // Update the state with errors
    setErrors(newErrors);

    // Return whether the form is valid
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async () => {
    const { name, surname, postalCode, address, country, voivodeship, phoneNumber } = userDetails;

    if (!name || !surname || !postalCode || !address || !country || !voivodeship || !phoneNumber) {
      alert("Please fill out all fields before placing the order.");
      return;
    }
    if (!validateInputs()) {
      alert("Please correct the errors before placing the order.");
      return;
    }

    setIsPlacingOrder(true);

    try {
      const userName = session?.user?.name;

      // Proceed with placing the order
      const response = await fetch("/api/cart/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userDetails: {
            name,
            surname,
            postalCode,
            address,
            country,
            voivodeship,
            phoneNumber,
          },
          cartItems,
          userName, // pass the userName
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Order placed successfully!\nThank you, ${name} ${surname}.`);
        const orderId = data.orderId; // Assuming the response contains the `orderId`
        window.location.href = `/orders/${userName}/${orderId}`;
      } else {
        alert(data.error || "Failed to place order");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while placing the order");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-5 mt-20">
        <h1 className="text-3xl font-bold text-gray-800 mb-5">Checkout</h1>

        <div className="bg-gray-100 p-5 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Details</h2>
          <form className="text-gray-800">
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
                {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
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
                {errors.surname && <p className="text-red-600 text-sm">{errors.surname}</p>}
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
                {errors.postalCode && <p className="text-red-600 text-sm">{errors.postalCode}</p>}
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
                {errors.phoneNumber && <p className="text-red-600 text-sm">{errors.phoneNumber}</p>}
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
              {errors.address && <p className="text-red-600 text-sm">{errors.address}</p>}
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
                {errors.country && <p className="text-red-600 text-sm">{errors.country}</p>}
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
                {errors.voivodeship && (
                  <p className="text-red-600 text-sm">{errors.voivodeship}</p>
                )}
              </div>
            </div>
          </form>
        </div>

        <div className="bg-white p-5 mt-5 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <>
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
            </>
          )}
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={isPlacingOrder}
          className={`mt-5 w-full px-6 py-3 text-lg rounded-lg transition ${
            isPlacingOrder ? "bg-gray-400 cursor-not-allowed" : "bg-teal-700 hover:bg-teal-800 text-white"
          }`}
        >
          {isPlacingOrder ? "Placing order..." : "Place Order"}
        </button>
      </div>

      <footer className="bg-gray-200 py-5 text-center mt-10">
        <p className="text-gray-600">&copy; 2025 Blossom Boutique. All rights reserved.</p>
      </footer>
    </Layout>
  );
};

export default CheckoutPage;
