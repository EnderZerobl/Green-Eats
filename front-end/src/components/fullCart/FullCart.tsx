// components/fullCart/FullCart.tsx
import React from 'react';
import ProductCard from '../productCard/ProductCard';
import "../fullCart/fullCart.css";
import { ResponseFromApi } from '@/lib/types';

const FullCart: React.FC<{ products: ResponseFromApi[] }> = ({ products }) => {
  if (!products || products.length === 0) {
    return null; // ou você pode retornar uma mensagem de "nenhum produto encontrado"
  }

  return (
    <>
      <section className="productCart">
        {products.map((product) => (
          <div key={product.id}>
            <ProductCard
              id={product.id}
              name={product.nome}
              oldPrice={product.preco}
              currentPrice={product.precoNovo}
              discount={product.desconto}
              imageUrl={"/appleProduct.svg"}
            />
          </div>
        ))}
      </section>
      <section className="orderResume">
        <h1>testando</h1>
      </section>
    </>
  );
};

export default FullCart;
