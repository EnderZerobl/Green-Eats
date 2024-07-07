import { ResponseFromApi } from '@/lib/types'
import './ProductCatalogue.css'
import ProductCard from '../productCard/ProductCard'

export default function ProductCatalogue ({ data }: {
    data: ResponseFromApi[]
}){
    return (
        <section className="catalogue">
            <h2 className="catalogue__title">Todos os Produtos</h2>
            <div className="catalogue__container">
                {data.map((cardData)=>(
                    <ProductCard key={cardData.nome} name={cardData.nome}
                     oldPrice={cardData.preco} currentPrice={cardData.precoNovo}
                     discount={cardData.desconto} imageUrl='/appleProduct.svg' />
                ))}
            </div>
        </section>
    )
}