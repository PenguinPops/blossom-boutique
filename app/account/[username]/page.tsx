"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession, signOut } from "next-auth/react";  // Import signOut from next-auth
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
    name: string;
    email: string;
}
const AccountPage: React.FC = () => {
    const { username } = useParams();
    const { data: session, status } = useSession();
    const [userDetails, setUserDetails] = useState<User | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [newName, setNewName] = useState<string>(''); // State for new username
    const [newEmail, setNewEmail] = useState<string>(''); // State for new email

    useEffect(() => {
        if (status === "loading") return;
        if (!session) {
            window.location.href = "/account/login";
            return;
        }

        const fetchUserDetails = async () => {
            try {
                const res = await fetch(`/api/account/${username}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch user details");
                }
                const data = await res.json();
                setUserDetails(data.user);
                setOrders(data.orders);
                setNewName(data.user.name); // Set the username in state
                setNewEmail(data.user.email); // Set the email in state
            } catch (err) {
                setError("Failed to fetch user details");
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            fetchUserDetails();
        }
    }, [username, session, status]);

    const handleUpdateDetails = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch(`/api/account/${username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newName, email: newEmail }),
        });

        if (!res.ok) {
            setError("Failed to update user details");
        } else {
            setError(null);
            const data = await res.json();
            alert(data.message); // Success message
            setUserDetails((prev) => ({ ...prev!, name: newName, email: newEmail }));

            // Redirect to the new username's account page
            window.location.href = `/account/${newName}`;  // Redirect to the updated username
        }
    };

    const handleLogout = () => {
        signOut({ redirect: true, callbackUrl: "/login" });  // Log out and redirect to login page
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
                                            value={newName} // Bind the input to newName state
                                            onChange={(e) => setNewName(e.target.value)} // Update state on change
                                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700">Email</label>
                                        <input
                                            type="email"
                                            value={newEmail} // Bind the input to newEmail state
                                            onChange={(e) => setNewEmail(e.target.value)} // Update state on change
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
                                                        <img
                                                            src={item.productImage}
                                                            alt={item.productName}
                                                            className="w-16 h-16 object-cover rounded-md mr-4"
                                                        />
                                                        <p className="text-gray-800">{item.productName}</p>
                                                        <p className="text-gray-600">Price: ${item.productPrice.toFixed(2)}</p>
                                                        <p className="text-gray-600">Quantity: {item.quantity}</p>
                                                    </div>
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

                {/* Logout Button at the bottom */}
                <div className="mt-10 flex justify-center">
                    <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default AccountPage;