import { UsableCart } from "@/lib/types";
import "../fullCart/newFullCart.css";
import ProductCart from "../productCart/ProductCart";


export default function FullCart({ shopCart, total }: {
    shopCart: UsableCart[];
    total: number;
}) {
    return(
        <>
            <section className="fullCart">
                <section className="productCart">
                    <h1 className="sectionTitle">Seu carrinho</h1>
                    {
                        shopCart.map(product=>(
                            <ProductCart key={product.id}
                            data={product}/>
                        ))
                    }
                </section>
                <section className="orderResume">
                    <h1 className="sectionTitle">Resumo do pedido</h1>
                    <div className="orderResumeTextContainer">
                        <div className="orderResumeText"><p>Produtos</p></div>
                        <div className="orderResumePrice"><p>R$ {total.toFixed(2).replace(".", ",")}</p></div>
                    </div>
                    <div className="orderResumeTextContainer">
                        <div className="orderResumeText"><p>Desconto</p></div>
                        <div className="orderResumePrice"><p>R$ 16,90</p></div>
                    </div>
                    <div className="orderResumeTextContainer .strong">
                        <div className="orderResumeText"><p>Preço estimado:</p></div>
                        <div className="orderResumePrice"><p><strong>R$ 16,90</strong></p></div>
                    </div>
                    <button>FINALIZAR PEDIDO</button>

                </section>
            </section>
            
        </>
    )
};
