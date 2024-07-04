// components/ProductCarousel.tsx
import React from 'react';
import Slider from 'react-slick';
import ProductCard from '../productCard/ProductCard';
import "../productCarousel/productCarousel.css";
import { NextArrow, PrevArrow } from '../arrowCarousel/Arrow';

const products = [
  { id: 1, name: 'Maça gala importada Orgânica - 500g', oldPrice: 20.00, currentPrice: 16.90, discount: 20, imageUrl: "/appleProduct.svg" },
  { id: 2, name: 'Maça gala importada Orgânica - 500g', oldPrice: 20.00, currentPrice: 16.90, discount: 20, imageUrl: "/appleProduct.svg" },
  { id: 3, name: 'Maça gala importada Orgânica - 500g', oldPrice: 20.00, currentPrice: 16.90, discount: 20, imageUrl: "/appleProduct.svg" },
  { id: 4, name: 'Maça gala importada Orgânica - 500g', oldPrice: 20.00, currentPrice: 16.90, discount: 20, imageUrl: "/appleProduct.svg" },
  { id: 5, name: 'Maça gala importada Orgânica - 500g', oldPrice: 20.00, currentPrice: 16.90, discount: 20, imageUrl: "/appleProduct.svg" },
];

const ProductCarousel: React.FC = () => {
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
        breakpoint: 730,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="productCarousel">
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id}>
            <ProductCard
              name={product.name}
              oldPrice={product.oldPrice}
              currentPrice={product.currentPrice}
              discount={product.discount}
              imageUrl={product.imageUrl}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductCarousel;
