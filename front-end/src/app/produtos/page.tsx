'use server';
import ClientSideProdutos from "@/components/ClientSideProdutos/ClientSideProdutos";
import { getProducts } from "@/services/GetProducts";

export default async function Produtos() {
    const data = {
        "Green Horta": (await getProducts({category: "Green Horta"})),
        "Green Mercearia": (await getProducts({category: "Green Mercearia"})),
        "Bebidas e Laticinios": (await getProducts({category: "Bebidas e Laticinios"})),
        "Ovos e Carnes": (await getProducts({category: "Ovos e Carnes"})),
    }

    return(
        <section className="container">
            <ClientSideProdutos higherData={data}/>
        </section>
    )
}