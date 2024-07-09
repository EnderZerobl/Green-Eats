'use service';
import Discovery from "@/components/discovery/discovery";
import Hero from "@/components/hero/Hero";
import ProductSection from "@/components/productSection/ProductSection"
import MainCategories from "@/components/mainCategories/MainCategories"
import ServiceBlock from "@/components/services-block/ServicesBlock"
import { getProducts } from "@/services/GetProducts";
import { createClient } from "@/prismicio";

export default async function Home() {
  //primeiramente o Hero pegará os dados do prismic para que possa exibir.
  //os dados são recebidos em forma de slices, que serão mandados para o carrossel.
  const client = createClient();

  const page = await client.getSingle("data");

  const products = await getProducts({});

  return (
    <main>
      <Hero page={page}/>
      <ServiceBlock />
      <ProductSection title="Green Horta" products={products}/>
      <ProductSection title="Green Mercearia" products={products}/>
      <ProductSection title="Bebidas e Laticinios" products={products}/>

      <MainCategories />

      <Discovery />
    </main>
  );
};