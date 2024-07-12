'use client';
import React from 'react';
import Slider from 'react-slick';
import ProductCard from '../productCard/ProductCard';
import ProductCardUnavailable from "../productCardUnavailable/ProductCardUnavailable";
import "../productCarousel/productCarousel.css";
import { NextArrow, PrevArrow } from '../arrowCarousel/Arrow';
import { ResponseFromApi } from '@/lib/types';

const ProductCarousel: React.FC<{ products: ResponseFromApi[] }> = ({ products }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1450,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings:{
          slidesToShow: 1,
          slidesToScroll: 1,
          nextArrow: undefined,
          prevArrow: undefined,
        }
      },
    ],
  };



  return (
    <div className="productCarousel">
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id}>
            <ProductCardUnavailable
              id={product.id}
              name={product.nome}
              oldPrice={product.preco}
              currentPrice={product.precoNovo}
              discount={product.desconto}
              imageUrl={(()=>{
                console.log(typeof product.imagemPath)
                //@ts-ignore
                return product.imagemPath
              })()}
            />
          </div>
        ))}
      </Slider>


    </div>
  );
};

export default ProductCarousel;
