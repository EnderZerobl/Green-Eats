import Discovery from "@/components/discovery/discovery";
import Hero from "@/components/hero/Hero";
import ProductSection from "@/components/productSection/ProductSection"
import ServiceBlock from "@/components/services-block/ServicesBlock"

export default function Home() {
  return (
    <main>
      <Hero />
      <ServiceBlock />
      <ProductSection title="Green Horta"/>
      <ProductSection title="Green Mercearia"/>
      <ProductSection title="Bebidas e Laticinios"/>
      <Discovery />
    </main>
  );
};