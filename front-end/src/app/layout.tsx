import "@/app/styles/reset.css";
import Header from "@/components/Header";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

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
    <html lang="pt-br">
      <body className={montserrat.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
