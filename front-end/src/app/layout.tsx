import "@/app/styles/reset.css";
import "@/app/styles/global.css"
import Header from "@/components/Header";
import Hero from "@/components/hero/Hero";
import { createClient, repositoryName } from "@/prismicio";
import { PrismicPreview } from "@prismicio/next";
import type { Metadata, ResolvingMetadata } from "next";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  
  const client = createClient();

  const page = await client.getSingle("metadata");

  const product = page.data;

  return {
    title: product.meta_title || "Green Eats",
    description: product.meta_description || "Seu site natural!",
    openGraph: {
      images: [product.meta_image.url || ""],
    },
    icons:{
      icon: product.icon.url || ""
    }
  }
}
 

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
        <PrismicPreview repositoryName={repositoryName}/>
      </body>
    </html>
  );
}
