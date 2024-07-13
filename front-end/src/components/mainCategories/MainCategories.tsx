import CategorieCard from "../categorieCard/CategorieCard"
import "../mainCategories/mainCategories.css"
import categorieIcon from "../../../public/categorie-icon.svg"
import { mainTypesOfProducts } from "@/lib/static-data"
import Link from "next/link"
import leiteVegetalIcon from "@public/tipos/leiteVegetal.svg";
import cogumeloIcon from "@public/tipos/cogumelos.svg";
import ovosIcon from "@public/tipos/ovos.svg";
import frangoIcon from "@public/tipos/frango.svg";
import leiteIcon from "@public/tipos/leite.svg";
import graosIcon from "@public/tipos/graos.svg";
import frutasIcon from "@public/tipos/frutas.svg";
import biscoitoIcon from "@public/tipos/biscoitos.svg";
import carneIcon from "@public/tipos/carne.svg";
import farinhaIcon from "@public/tipos/farinha.svg";
import legumesIcon from "@public/tipos/vegetais.svg";




export default function MainCategories() {
    const icons = [
        leiteVegetalIcon,
        cogumeloIcon,
        ovosIcon,
        frangoIcon,
        leiteIcon,
        graosIcon,
        frutasIcon,
        biscoitoIcon,
        carneIcon,
        farinhaIcon,
        categorieIcon,
        legumesIcon
    ]
    return(
        <>
            <section className="mainCategories">
                <h1>Principais tipos</h1>
                <div className="categorieCardContainer">
                    {
                        mainTypesOfProducts.map((prodType, i)=>{
                            return (
                                <Link href={"/produtos?type="+prodType}
                                key={prodType}>
                                    <CategorieCard 
                                        imageUrl={icons[i]}
                                        imageAlt={"Ícone do tipo "+prodType}
                                        categorieText={prodType}
                                    />
                                </Link>
                            )
                        })


                    }
                </div>
                
            </section>
        </>
    )
};
