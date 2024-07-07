'use server';
import "@/app/styles/single-product-page.css"
import ProductCarousel from "@/components/productCarousel/ProductCarousel"
import SingleProductInfo from "@/components/singleProductInfo/SingleProductInfo";
import { getProducts } from "@/services/GetProducts"
import Image from "next/image";
import appleImage from "@public/appleProduct.svg"
import HeartIcon from "@/components/heartIcon/HeartIcon";
import ProductInfoDropdown from "@/components/productInfoDropdown/productInfoDropdown";

export default async function Page ({ params }: {
    params:{
        id: string
    }
}) {

    const product = (await getProducts({id: parseInt(params.id)}))[0];
    const products = await getProducts({});

    return (
        <>
            <section className="product-info page flexer">
                <div className="product-info__hero">
                    <div className="product-info__hero__image">
                        <Image src={appleImage} alt="imagem"
                         className="product-info__hero__image__element" width={500} height={500} />
                         <HeartIcon />
                    </div>
                    <SingleProductInfo nome={product.nome}
                    categoria={product.categoria}
                    tipo={product.tipo} preco={product.preco} />
                </div>
                <ProductInfoDropdown title="Descrição" content={product.descricaoId.toFixed()}/>
                <ProductInfoDropdown title="Informações de armazenamento(Recomendado)" content={product.armazenId.toFixed()}/>
            </section>
            <ProductCarousel products={products} />
        </>
    )
}