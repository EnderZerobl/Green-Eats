'use service';
import Discovery from "@/components/discovery/discovery";
import Hero from "@/components/hero/Hero";
import ProductSection from "@/components/productSection/ProductSection"
import ServiceBlock from "@/components/services-block/ServicesBlock"
import { getProducts } from "@/services/GetProducts";

export default async function Home() {

  const products = await getProducts({});

  return (
    <main>
      <Hero />
      <ServiceBlock />
      <ProductSection title="Green Horta" products={products}/>
      <ProductSection title="Green Mercearia" products={products}/>
      <ProductSection title="Bebidas e Laticinios" products={products}/>
      <Discovery />
    </main>
  );
};