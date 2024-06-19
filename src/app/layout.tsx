import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import StoreProvider from "./StoreProvider";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Metadata } from "next";

import AuthProvider from '../providers/AuthProvider';
import Footer from "@/components/Footer/Footer";

const plus_jakarta_sans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GoHire",
  icons: {
    icon: '/icon.ico',
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={plus_jakarta_sans.className}>
        <StoreProvider>
          <UserProvider>
            <AuthProvider>
              <Navbar />
              {children}
              <Footer />
            </AuthProvider>
          </UserProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
