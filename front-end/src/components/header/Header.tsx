import './Header.css';
import Image from 'next/image';
import Link from 'next/link';
import searchIcon from "../../../public/search.svg"
import marketIcon from "../../../public/market.svg"
import profileIcon from "../../../public/profile.svg"


export default function Header() {
    return (
        <>
        <header>
            <div className="topContentContainer">
                    <div className="logo">
                        <h1>Green Eats</h1>
                    </div>
                    <div className="searchContainer">
                        <input type="text" name="" id="" placeholder="Nome do produto"/>
                        <button className="searchIconContainer">
                            <Image src={searchIcon} width={0} height={0} alt="Ícone de pesquisar"/>
                        </button>
                    </div>

                    <div className="pagesContainer">
                        <div className="pagesIconContainer">
                            <Link href="/"><Image src={marketIcon} width={0} height={0} alt="Ícone de carrinho" /></Link>
                        </div>
                        <div className="pagesIconContainer">
                            <Link href="/"><Image src={profileIcon} width={0} height={0} alt="Ícone de perfil" /></Link>
                        </div>
                    </div>
                </div>

        </header>
        <nav>
            <div className="navContainer">
                <div className="navTextContainer">
                    <Link href="/">
                        <p>Promoções</p>
                    </Link>
                </div>
                <div className="navTextContainer">
                    <Link href="/">
                        <p>Green Horta</p>
                    </Link>
                </div>
                <div className="navTextContainer bigger">
                    <Link href="/">
                        <p>Green Mercearia</p>
                    </Link>
                    
                </div>
                <div className="navTextContainer bigger">
                    <Link href="/">
                        <p>Bebidas e Laticínios</p>
                    </Link>
                </div>
                <div className="navTextContainer">
                    <Link href="/">
                        <p>Ovos e Carnes</p>
                    </Link>
                </div>

            </div>
            
        </nav>
        </>
    )
};
