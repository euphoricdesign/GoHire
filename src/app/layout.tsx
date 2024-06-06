import { Inter, Plus_Jakarta_Sans, Merriweather } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import StoreProvider from "./StoreProvider";
import { UserProvider } from '@auth0/nextjs-auth0/client'
const plus_jakarta_sans = Plus_Jakarta_Sans({ subsets: ["latin"] });

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
            <Navbar />
            {children}
          </UserProvider>
        </StoreProvider>
      </body>
    </html>
  );
}