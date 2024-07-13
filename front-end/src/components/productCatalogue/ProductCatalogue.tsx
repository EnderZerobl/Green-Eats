import { ResponseFromApi } from '@/lib/types'
import './ProductCatalogue.css'
import ProductCard from '../productCard/ProductCard'
import Link from 'next/link'
import ProductCardUnavailable from '../productCardUnavailable/ProductCardUnavailable'

function NotFoundMessage () {
    
    return(
        <>
        <h2 className='not-found-message'>{`Não conseguimos achar o produto desejados :(`}</h2>
        <Link href={"/produtos"} className='clear-button generic-button'>LIMPAR BUSCA</Link>
        </>
    )
}

export default function ProductCatalogue ({ data, catalogueQuantity, toggleAddModal, toggleEditModal }: {
    data: ResponseFromApi[];
    catalogueQuantity: JSX.Element;
    toggleAddModal: ()=>void;
    toggleEditModal: (data: ResponseFromApi)=>void;
}){
    let products: JSX.Element[] = [];
    if (data.length){
        products = data.map((cardData)=>(
            cardData.estoque?
            <ProductCard key={cardData.nome} data={cardData}
             openModal={(data: ResponseFromApi)=>{toggleEditModal(cardData)}} />
            : <ProductCardUnavailable key={cardData.nome} data={cardData}
            openModal={(data: ResponseFromApi)=>{toggleEditModal(cardData)}} />
        ));
    }

    return (
        <section className="catalogue">
            <div className='catalogue__head'>
                <div className='catalogue__head__text'>
                    <h2 className="catalogue__head__text__title">Todos os Produtos</h2>
                    {catalogueQuantity}
                </div>
                <button onClick={()=>{toggleAddModal()}}
                 className='catalogue__head__button generic-button'
                >CRIAR PRODUTO</button>
            </div>
            <div className="catalogue__container">
                {products.length?
                products
                :<NotFoundMessage />
                } 
            </div>
        </section>
    )
}