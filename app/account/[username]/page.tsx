"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Layout from "@/app/components/Layout"; // Assuming Layout contains footer

interface OrderDetail {
    productId: number;
    quantity: number;
    productName: string;
    productPrice: number;
    productImage: string;
}

interface Order {
    orderId: number;
    total: number;
    details: OrderDetail[];
}

interface User {
    id: number;
    username: string;
    email: string;
}

const AccountPage: React.FC = () => {
    const { username } = useParams(); // Fetch params from the URL
    const [userDetails, setUserDetails] = useState<User | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const res = await fetch(`/api/account/${username}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch user details");
                }
                const data = await res.json();
                setUserDetails(data.user);
                setOrders(data.orders);
            } catch (err) {
                setError("Failed to fetch user details");
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            fetchUserDetails();
        }
    }, [username]);

    const handleUpdateDetails = async (e: React.FormEvent) => {
        e.preventDefault();
        // Form handling for updating user details (email, password, etc.)
        // This should call an API endpoint to handle the update logic (hashing password, updating email, etc.)
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto p-5 mt-20 text-black">
                <h1 className="text-3xl font-bold text-gray-800 mb-5">Account Details</h1>

                {loading ? (
                    <p className="text-lg text-gray-600">Loading...</p>
                ) : error ? (
                    <p className="text-lg text-red-600">{error}</p>
                ) : (
                    <>
                        {userDetails && (
                            <div className="mb-5">
                                <h2 className="text-2xl font-semibold">User Details</h2>
                                <form onSubmit={handleUpdateDetails} className="space-y-4">
                                    <div>
                                        <label className="block text-gray-700">Username</label>
                                        <input
                                            type="text"
                                            value={userDetails.username}
                                            readOnly
                                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700">Email</label>
                                        <input
                                            type="email"
                                            defaultValue={userDetails.email}
                                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded"
                                        />
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="w-full px-4 py-2 mt-2 bg-blue-600 text-white rounded"
                                        >
                                            Update Details
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

            <div>
            <h2 className="text-2xl font-semibold mt-10">My Orders</h2>
            <ul className="divide-y divide-gray-300 mt-5">
                {orders.map((order) => (
                <li key={order.orderId} className="py-5 bg-gray-100 px-4 rounded-lg">
                    <h3 className="text-xl font-semibold">Order #{order.orderId}</h3>
                    <p>Total: ${order.total.toFixed(2)}</p>

                    <ul className="mt-3">
                    {order.details.map((item) => (
                        <li key={item.productId} className="flex items-center py-3">
                        <div className="flex-1">
                            {/* Display Product Image */}
                            <img
                            src={item.productImage} // Does exist "acchually"
                            alt={item.productName}
                            className="w-16 h-16 object-cover rounded-md mr-4"
                            />
                            <p className="text-gray-800">{item.productName}</p>
                            <p className="text-gray-600">Price: ${item.productPrice.toFixed(2)}</p>
                            <p className="text-gray-600">Quantity: {item.quantity}</p>
                        </div>

                        {/* Button to Redirect to Order Details Page */}

                        </li>
                    ))}
                    </ul>
                    <div className="ml-4">
                            <button
                            onClick={() => window.location.href = `/orders/${username}/${order.orderId}`}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                            View Order Details
                            </button>
                    </div>
                </li>
                ))}
            </ul>
            </div>


                    </>
                )}
            </div>
        </Layout>
    );
};

export default AccountPage;
