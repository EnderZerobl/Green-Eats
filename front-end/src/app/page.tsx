'use service';
import Discovery from "@/components/discovery/discovery";
import Hero from "@/components/hero/Hero";
import ProductSection from "@/components/productSection/ProductSection"
import MainCategories from "@/components/mainCategories/MainCategories"
import ServiceBlock from "@/components/services-block/ServicesBlock"
import { getProducts } from "@/services/GetProducts";
import { createClient } from "@/prismicio";
import { categorysList, characteristics } from "@/lib/static-data";

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
      {categorysList.map(async singleProduct=>{
        return (
          <ProductSection key={singleProduct.name}
           title={singleProduct.name} 
           products={await getProducts({category:singleProduct.name})}/>
        )
      })}

      <MainCategories />

      <Discovery />
    </main>
  );
};