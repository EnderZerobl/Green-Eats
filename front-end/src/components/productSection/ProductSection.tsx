import ProductList from "../productList/ProductList"
import Link from "next/link"
import "../../components/productSection/productSection.css"

export default function ProductSection() {
    return(
        <>
            <section className="productSection">
                <div className="productSectionText">
                    <h1>Green Horta</h1>
                    <Link href="/"><span>ver mais</span></Link>
                </div>
                <ProductList />
            </section>
        </>
    )
};
