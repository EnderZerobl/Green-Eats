import Image from "next/image";
import "../categorieCard/categorieCard.css";

interface CategorieCardProps {
  imageUrl: string;
  imageAlt: string;
  categorieText: string;
}

const CategorieCard: React.FC<CategorieCardProps> = ({ imageUrl, imageAlt, categorieText }) => {
  return (
    <div className="categorieCard">
      <div className="categorieCardImage">
        <Image src={imageUrl} alt={imageAlt} width={0} height={0} />
      </div>
      <div className="categorieCardText">
        <p>{categorieText}</p>
      </div>
    </div>
  );
};

export default CategorieCard;
