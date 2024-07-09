import EmptyCart from "@/components/emptyCart/EmptyCart";
import FullCart from "@/components/fullCart/FullCart";
import ProductCarousel from "@/components/productCarousel/ProductCarousel";
import { getProducts } from "@/services/GetProducts";

export default async function page() {
  const carrouselProducts = await getProducts({});
  return(
    <>
    <FullCart />
    <ProductCarousel products={carrouselProducts} />
    </>
  )
};

