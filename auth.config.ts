import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: '/login', // 로그인할 때 이 페이지로 이동 시킴
  },
  callbacks: {
    authorized({ auth, request: { nextUrl }}) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      if (isOnDashboard) {
        if (isLoggedIn) {
          return true;
        }

        return false; // Redirect unauthenticated users to login page;
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;