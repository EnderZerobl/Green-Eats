import Header from "@/components/Header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/styles/reset.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Green-eats",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <Header></Header>
    </html>
  );
}
