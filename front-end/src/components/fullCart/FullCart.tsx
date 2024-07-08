import "../fullCart/fullCart.css"
import ProductCart from "../productCart/ProductCart"

export default function FullCart() {
    return(
        <>
            <section className="fullCart">
                <section className="productCart">
                    <h1>Seu carrinho</h1>
                    <ProductCart />

                </section>
                <section className="orderResume"></section>
            </section>
            
        </>
    )
};
