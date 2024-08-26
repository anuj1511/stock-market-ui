import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar  from '@/app/ui/utility/NavBar'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stock Market UI",
  description: "TU wallstreet to manage stock market",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}> 

		<NavBar />
		{children}
      </body>
    </html>
  );
}
