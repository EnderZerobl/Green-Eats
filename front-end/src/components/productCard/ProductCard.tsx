// components/ProductCard.tsx
"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import "../productCard/productCard.css";
import favoriteIcon from "../../../public/favoriteIcon.svg";
import marketCarIcon from "../../../public/marketProductCard.svg";
import Link from 'next/link';

interface ProductCardProps {
  id: number;
  name: string;
  oldPrice: number;
  currentPrice: number;
  discount: number;
  imageUrl: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, oldPrice, currentPrice, discount, imageUrl }) => {
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(prevQuantity => Math.max(prevQuantity - 1, 0));
  };

  return (
    <section className="sectionProductCard">
      <div className="productCardContainer">
        <div className="productCard">
          <div className="cardImageText">
            <div className="cardImage">
              <div className="headerCardImage">
                <div className="discount">
                  <span>-{discount}%</span>
                </div>
                <div className="favoriteIcon">
                  <button>
                    <Image src={favoriteIcon} alt="Ícone de coração que tem a função de favoritar o produto" width={0} height={0} />
                  </button>
                </div>
              </div>
              <Link href={"/produtos/"+id} className="productImage">
                <Image src={imageUrl} alt="Imagem do produto a venda" width={286} height={196} />
              </Link>
            </div>
            <div className="cardText">
              <Link href={"/produtos/"+id} className="productText">
                <p>{name}</p>
              </Link>
            </div>
          </div>
          <div className="cardProductPrice">
            <div className="oldPrice">
              <p>R$ {oldPrice.toFixed(2)}</p>
            </div>
            <div className="currentPrice">
              <p>R$ {currentPrice.toFixed(2)}</p>
            </div>
          </div>
          <div className="productPurchase">
            <div className="productPurchaseCounter">
              <button onClick={handleDecrement}>-</button>
              <p>{quantity}</p>
              <button onClick={handleIncrement}>+</button>
            </div>
            <div className="productPurchaseBuy">
              <button>
                <Image src={marketCarIcon} width={0} height={0} alt="Ícone de adicionar ao carrinho" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
