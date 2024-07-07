import CategorieCard from "../categorieCard/CategorieCard"
import "../mainCategories/mainCategories.css"
import categorieIcon from "../../../public/categorie-icon.svg"


export default function MainCategories() {
    return(
        <>
            <section className="mainCategories">
                <h1>Principais categorias</h1>
                <div className="categorieCardContainer">
                    <CategorieCard 
                        imageUrl={categorieIcon}
                        imageAlt="Ícone de categoria"
                        categorieText="Sucos Naturais"
                    />
                    <CategorieCard 
                        imageUrl={categorieIcon}
                        imageAlt="Ícone de categoria"
                        categorieText="Sucos Naturais"
                    />
                    <CategorieCard 
                        imageUrl={categorieIcon}
                        imageAlt="Ícone de categoria"
                        categorieText="Sucos Naturais"
                    />
                    <CategorieCard 
                        imageUrl={categorieIcon}
                        imageAlt="Ícone de categoria"
                        categorieText="Sucos Naturais"
                    />
                    <CategorieCard 
                        imageUrl={categorieIcon}
                        imageAlt="Ícone de categoria"
                        categorieText="Sucos Naturais"
                    />
                    <CategorieCard 
                        imageUrl={categorieIcon}
                        imageAlt="Ícone de categoria"
                        categorieText="Sucos Naturais"
                    />
                </div>
                
            </section>
        </>
    )
};
