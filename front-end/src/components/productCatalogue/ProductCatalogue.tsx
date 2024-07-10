import { ResponseFromApi } from '@/lib/types'
import './ProductCatalogue.css'
import ProductCard from '../productCard/ProductCard'

export default function ProductCatalogue ({ data }: {
    data: ResponseFromApi[]
}){
    const products = data.map((cardData)=>(
                    <ProductCard key={cardData.nome} id={cardData.id} name={cardData.nome}
                     oldPrice={cardData.preco} currentPrice={cardData.precoNovo}
                     discount={cardData.desconto} imageUrl='/appleProduct.svg' />
                ))

    return (
        <section className="catalogue">
            <h2 className="catalogue__title">Todos os Produtos</h2>
            <div className="catalogue__container">
                {products.length?
                products
                :<h2>{`Não conseguimos achar o produto desejados :(`}</h2>}
            </div>
        </section>
    )
}