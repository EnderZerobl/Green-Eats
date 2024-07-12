import EmptyCart from "@/components/emptyCart/EmptyCart";
import FullCart from "@/components/fullCart/FullCart";
import ProductCarousel from "@/components/productCarousel/ProductCarousel";
import { getProducts } from "@/services/GetProducts";
import { fetchCart } from "@/services/ManageCart";

export default async function page() {
  const shopCart = await fetchCart("get")
  const carrouselProducts = await getProducts({});

  return(
    <>
    {
      shopCart.length?
      <FullCart shopCart={shopCart} />
      : <EmptyCart />
    }
    <ProductCarousel products={carrouselProducts} />
    </>
  )
};

