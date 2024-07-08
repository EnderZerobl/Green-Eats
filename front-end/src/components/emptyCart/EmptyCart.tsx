import "../emptyCart/emptyCart.css"
import Link from "next/link"

export default function EmptyCart() {
    return(
        <>
            <section className="emptyCart">
                <h1>Seu carrinho está vazio</h1>
                <p>Para continuar comprando, navegue pelas categorias do site ou faça uma busca pelo seu produto.</p>
                <Link href="/produtos"><button>ESCOLHER PRODUTOS</button></Link>
                
            </section>
        </>
    )
};
