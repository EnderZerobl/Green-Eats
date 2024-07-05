'use server';
import ClientSideProdutos from "@/components/ClientSideProdutos/ClientSideProdutos";

export default async function Produtos() {
    return(
        <section className="container">
            <ClientSideProdutos />
        </section>
    )
}