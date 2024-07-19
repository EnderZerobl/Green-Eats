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
                        <HeartIcon />
                        <Image src={product.imagemPath as string} alt="imagem"
                         className="product-info__hero__image__element" width={500} height={500} />
                    </div>
                    <SingleProductInfo id={product.id} nome={product.nome}
                    categoria={product.categoria} imagemPath={product.imagemPath as string}
                    tipo={product.tipo} preco={product.preco} exclusivo={product.exclusivo} />
                </div>
                <ProductInfoDropdown title="Descrição" content={product.desc? product.desc : ""}/>
                {
                    product.armazen?
                    <ProductInfoDropdown title="Informações de armazenamento(Recomendado)" content={product.armazen}/>
                    :<></>
                }
            </section>
            <ProductCarousel products={products} />
        </>
    )
}