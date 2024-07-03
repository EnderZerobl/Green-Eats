import ProductCard from "../productCard/ProductCard"
import "../productList/productList.css"

export default function ProductList() {
    return(
        <>
        <section className="productList">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
        </section>
            
        </>
    )
};
