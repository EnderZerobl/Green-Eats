import { ResponseFromApi } from '@/lib/types'
import './ProductCatalogue.css'
import ProductCard from '../productCard/ProductCard'
import Link from 'next/link'

function NotFoundMessage () {
    
    return(
        <>
        <h2 className='not-found-message'>{`Não conseguimos achar o produto desejados :(`}</h2>
        <Link href={"/produtos"} className='clear-button generic-button'>LIMPAR BUSCA</Link>
        </>
    )
}

export default function ProductCatalogue ({ data }: {
    data: ResponseFromApi[]
}){
    let products: JSX.Element[] = [];
    if (data.length){
        products = data.map((cardData)=>(
            <ProductCard key={cardData.nome} id={cardData.id} name={cardData.nome}
            oldPrice={cardData.preco} currentPrice={cardData.precoNovo}
            discount={cardData.desconto} imageUrl='/appleProduct.svg' />
        ));
    }

    return (
        <section className="catalogue">
            <h2 className="catalogue__title">Todos os Produtos</h2>
            <div className="catalogue__container">
                {products.length?
                products
                :<NotFoundMessage />
                } 
            </div>
        </section>
    )
}