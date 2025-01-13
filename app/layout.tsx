import './globals.css';

import { GeistSans } from 'geist/font/sans';
import { SessionProvider } from 'next-auth/react';

let title = 'Blossom Boutique';
let description =
  'Your one-stop shop for all things flowers.';

export const metadata = {
  title,
  description,
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  metadataBase: new URL('http://localhost:3000/'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
    <html lang="en">
      <body className={GeistSans.variable}>
        {children}
      </body>
    </html>
    </SessionProvider>
  );
}
