import Hero from "@/components/hero/Hero";
import ProductSection from "@/components/productSection/ProductSection";
import { createClient } from "@/prismicio";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProductSection title="Green Horta"/>
      <ProductSection title="Green Mercearia"/>
      <ProductSection title="Bebidas e Laticinios"/>
    </main>
  );
}