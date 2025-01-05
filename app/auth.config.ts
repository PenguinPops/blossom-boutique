import { NextAuthConfig } from 'next-auth';

export const authConfig = {
  providers: [

  ],
  pages: {
    signIn: '/login',
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnProtectedPage = nextUrl.pathname.startsWith('/protected');
      const isOnAccountPage = nextUrl.pathname.startsWith('/account');
      const isOnOrderPage = nextUrl.pathname.startsWith('/orders');
      const isOnCartPage = nextUrl.pathname.startsWith('/cart');

      // Allow access to `/protected` only if logged in
      if (isOnProtectedPage) {
        return isLoggedIn;
      }

      // Allow access to `/account` pages if logged in
      if (isOnAccountPage) {
        return isLoggedIn;
      }

      if (isOnOrderPage) {
        return isLoggedIn;
      }

      if (isOnCartPage) {
        return isLoggedIn;
      }

      // Redirect logged-in users trying to access the login page to `/account`
      if (nextUrl.pathname === '/login' && isLoggedIn) {
        return Response.redirect(new URL('/account', nextUrl));
      }

      // Allow unauthenticated users to access all other pages
      return true;
    },
  },
} satisfies NextAuthConfig;
