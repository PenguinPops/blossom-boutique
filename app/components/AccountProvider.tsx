// components/AccountProvider.tsx
import { SessionProvider } from "next-auth/react";
import React from "react";

interface AccountProviderProps {
  children: React.ReactNode;
}

const AccountProvider: React.FC<AccountProviderProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AccountProvider;
