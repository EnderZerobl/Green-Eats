// components/ProductCard.tsx
"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import "../productCardUnavailable/productCardUnavailable.css";
import favoriteIcon from "../../../public/favoriteIcon.svg";
import filledFavoriteIcon from "@public/filledFavoriteIcon.svg"
import marketCarIcon from "../../../public/marketProductCard.svg";
import Link from 'next/link';

interface ProductCardProps {
  id: number;
  name: string;
  oldPrice: number;
  currentPrice: number;
  discount: number;
  imageUrl: string | File;
}

const ProductCardUnavailable: React.FC<ProductCardProps> = ({ id, name, oldPrice, currentPrice, discount, imageUrl }) => {
  const [quantity, setQuantity] = useState(0);
  const [ favorite, setFavorite ] = useState(false);

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(prevQuantity => Math.max(prevQuantity - 1, 0));
  };
  console.log(imageUrl);
  console.log("a")

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
                    <Image src={favorite? filledFavoriteIcon : favoriteIcon} 
                    alt="Ícone de coração que tem a função de favoritar o produto" 
                    onClick={()=>{setFavorite(!favorite)}}
                    width={0} height={0} />
                  </button>
                </div>
              </div>
              <Link href={"/produtos/"+id} className="productImage">
                <Image src={imageUrl.toString()} alt="Imagem do produto a venda" width={286} height={196} />
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
            <div className="unavailableContainer">
              <h1>Indisponível</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCardUnavailable;
