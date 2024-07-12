"use client"
import ProductCarousel from '../productCarousel/ProductCarousel';
import Link from 'next/link';
import "../../components/productSection/productSection.css";
import { ResponseFromApi } from '@/lib/types';

interface ProductSectionProps {
  title: string;
  products: ResponseFromApi[];
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, products }) => {
  return (
    <section className="productSection">
      <div className="headerProductSection">
        <div className="productSectionText">
          <h1>{title}</h1>
          <div className="productLinkContainer">
            <Link href="/"><span>ver mais</span></Link>
          </div>
        </div>
      </div>
      <ProductCarousel products={products} />
      <div className="productLinkContainerMobile">
        <Link href="/"><span>ver mais</span></Link>
      </div>
    </section>
  );
};

export default ProductSection;
