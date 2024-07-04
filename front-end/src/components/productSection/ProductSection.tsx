"use client"
import ProductCarousel from '../productCarousel/ProductCarousel';
import Link from 'next/link';
import "../../components/productSection/productSection.css";

interface ProductSectionProps {
  title: string;
}

const ProductSection: React.FC<ProductSectionProps> = ({ title }) => {
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
      <ProductCarousel />
    </section>
  );
};

export default ProductSection;
