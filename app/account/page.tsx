"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AccountRedirectPage: React.FC = () => {
  const { data: session, status } = useSession(); // Get the session data
  const router = useRouter();

  useEffect(() => {
    console.log("Session Status:", status); // Log session status
    console.log("Session Data:", session); // Log session data

    if (status === "loading") return; // Do nothing while session is loading

    if (!session) {
      console.log("No session found, redirecting to login.");
      router.push("/login");
    } else {
      const username = session.user?.name;
      if (username) {
        console.log(`Redirecting to /account/${username}`);
        router.push(`/account/${username}`);
      } else {
        console.log("No username found, redirecting to login.");
        router.push("/login");
      }
    }
  }, [session, status, router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg text-gray-700">Redirecting...</p>
    </div>
  );
};

export default AccountRedirectPage;
