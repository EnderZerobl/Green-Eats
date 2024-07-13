import EmptyCart from "@/components/emptyCart/EmptyCart";
import FullCart from "@/components/fullCart/FullCart";
import ProductCarousel from "@/components/productCarousel/ProductCarousel";
import { ResponseFromApi, UsableCart } from "@/lib/types";
import { getProducts } from "@/services/GetProducts";
import { fetchCart } from "@/services/ManageCart";

export default async function page() {
  const shopCart: UsableCart[] = await fetchCart("get")
  const shopIds = shopCart.map((elem, i)=>({
    prodId: elem.produtoId,
    cardId: i,
  }));

  for (let ids of shopIds) {
    const item = await getProducts({id: ids.prodId});
    shopCart[ids.cardId].produto = item[0]
  }

  const cartTotal = await fetchCart("total");

  const carrouselProducts = await getProducts({});


  return(
    <>
    {
      shopCart.length?
      <FullCart shopCart={shopCart} total={cartTotal} />
      : <EmptyCart />
    }
    <ProductCarousel products={carrouselProducts} />
    </>
  )
};

