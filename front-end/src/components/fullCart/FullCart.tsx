import "../fullCart/newFullCart.css"
import ProductCart from "../productCart/ProductCart"


export default function FullCart() {
    return(
        <>
            <section className="fullCart">
                <section className="productCart">
                    <h1 className="sectionTitle">Seu carrinho</h1>
                    <ProductCart />
                    <ProductCart />
                    <ProductCart />

                </section>
                <section className="orderResume">
                    <h1 className="sectionTitle">Resumo do pedido</h1>
                    <div className="orderResumeTextContainer">
                        <div className="orderResumeText"><p>Produtos</p></div>
                        <div className="orderResumePrice"><p>R$ 16,90</p></div>
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
