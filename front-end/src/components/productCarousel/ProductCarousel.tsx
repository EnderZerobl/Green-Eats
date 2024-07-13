'use client';
import React, { useState } from 'react';
import Slider from 'react-slick';
import ProductCard from '../productCard/ProductCard';
import ProductCardUnavailable from "../productCardUnavailable/ProductCardUnavailable";
import "../productCarousel/productCarousel.css";
import { NextArrow, PrevArrow } from '../arrowCarousel/Arrow';
import { ResponseFromApi } from '@/lib/types';
import AdminPage from '../adminPage/AdminPage';

const ProductCarousel: React.FC<{ products: ResponseFromApi[] }> = ({ products }) => {
  const [ displayEditModal, setDisplayEditModal ] = useState(false);
  const [ dataToEdit, setDataToEdit ] = useState<ResponseFromApi[]>([]);

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
            {
              product.estoque?
              <ProductCard
              data={product} openModal={(data: ResponseFromApi)=>{
                setDataToEdit([data])
                setDisplayEditModal(true)
                }}
              />
              :<ProductCardUnavailable
              data={product} openModal={(data: ResponseFromApi)=>{
                setDataToEdit([data])
                setDisplayEditModal(true)
                }}
              />
            }
          </div>
        ))}
      </Slider>

      {displayEditModal && <AdminPage type="edit" data={dataToEdit[0]} close={()=>{setDisplayEditModal(false)}}/>}

    </div>
  );
};

export default ProductCarousel;
