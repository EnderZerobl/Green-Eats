"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import "../productCard/productCard.css";
import productImage from "../../../public/appleProduct.svg";
import favoriteIcon from "../../../public/favoriteIcon.svg";
import marketCarIcon from "../../../public/marketProductCard.svg";

const ProductCard: React.FC = () => {
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
                  <span>-20%</span>
                </div>
                <div className="favoriteIcon">
                  <button>
                    <Image src={favoriteIcon} alt="Ícone de coração que tem a função de favoritar o produto" width={0} height={0} />
                  </button>
                </div>
              </div>
              <div className="productImage">
                <Image src={productImage} alt="Imagem do produto a venda" width={286} height={196} />
              </div>
            </div>
            <div className="cardText">
              <div className="productText">
                <p>Maça gala importada Orgânica - 500g</p>
              </div>
            </div>
          </div>
          <div className="cardProductPrice">
            <div className="oldPrice">
              <p>R$ 20,00</p>
            </div>
            <div className="currentPrice">
              <p>R$ 16,90</p>
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
