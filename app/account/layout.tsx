// app/account/layout.tsx
import AccountProvider from "@/app/components/AccountProvider";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <AccountProvider>
      <div>{children}</div>
    </AccountProvider>
  );
}