// components/ProductCard.tsx
"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import "../productCard/productCard.css";
import favoriteIcon from "../../../public/favoriteIcon.svg";
import filledFavoriteIcon from "@public/filledFavoriteIcon.svg"
import pencilIcon from "@public/pencil.svg"
import marketCarIcon from "../../../public/marketProductCard.svg";
import Link from 'next/link';
import { ResponseFromApi } from '@/lib/types';

interface ProductCardProps {
  data: ResponseFromApi;
  openModal: (data: ResponseFromApi)=>void;
}

const ProductCard: React.FC<ProductCardProps> = ({ data, openModal }) => {
  const [quantity, setQuantity] = useState(0);
  const [ favorite, setFavorite ] = useState(false);

  const { id, nome:name, preco:oldPrice,
     precoNovo:currentPrice, desconto:discount,
     imagemPath:imageUrl } = data

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(prevQuantity => Math.max(prevQuantity - 1, 0));
  };

  console.log(imageUrl)

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
                  <button onClick={()=>openModal(data)}>
                    <Image src={pencilIcon}
                    alt='Ícone de Lápis para edição do produto'
                    width={50} height={50} />
                  </button>
                  <button>
                    <Image src={favorite? filledFavoriteIcon : favoriteIcon} 
                    alt="Ícone de coração que tem a função de favoritar o produto" 
                    onClick={()=>{setFavorite(!favorite)}}
                    width={0} height={0} />
                  </button>
                </div>
              </div>
              <Link href={"/produtos/"+id} className="productImage">
                <Image src={imageUrl as string} alt="Imagem do produto a venda" width={286} height={196} />
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
