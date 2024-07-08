import EmptyCart from "@/components/emptyCart/EmptyCart";
import FullCart from "@/components/fullCart/FullCart";
import { ResponseFromApi } from '@/lib/types';

export default function Page({ products }: { products: ResponseFromApi[] }) {
  return (
    <>
      {products && products.length > 0 ? <FullCart products={products} /> : <EmptyCart />}
    </>
  );
}
