"use client"

import './Header.css';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import searchIcon from "@public/search.svg";
import marketIcon from "@public/market.svg";
import profileIcon from "@public/profile.svg";
import { useRouter } from 'next/navigation';

export default function Header() {
    const [ search, setSearch ] = useState("");

    const router = useRouter();

    useEffect(() => {
        const searchIconContainer = document.querySelector('.searchIconContainer');
        const searchContainer = document.querySelector('.searchContainer');
        const searchInput = document.querySelector('.searchInput');

        if (searchIconContainer && searchContainer) {
            const handleMouseOver = () => {
                (searchInput as HTMLElement).style.border = '2px solid var(--black-green)';
            };
            const handleMouseOut = () => {
                (searchInput as HTMLElement).style.border = '';
            };

            searchIconContainer.addEventListener('mouseover', handleMouseOver);
            searchIconContainer.addEventListener('mouseout', handleMouseOut);

            return () => {
                searchIconContainer.removeEventListener('mouseover', handleMouseOver);
                searchIconContainer.removeEventListener('mouseout', handleMouseOut);
            };
        }
    }, []);

    return (
        <>
            <header>
                <div className="topContentContainer">
                    <div className="logo">
                        <Link href="/produtos" className='logo__link'>Green Eats</Link>
                    </div>
                    <div className="searchContainer">
                        <input type="text" name="" id="" placeholder="Nome do produto" 
                        className="searchInput" value={search} onChange={e=>{
                            setSearch(e.target.value)
                        }}/>
                        <button className="searchIconContainer"
                        onClick={()=>{
                            if (search) {
                                router.push("/produtos?name="+search)
                            }
                        }}>
                            <Image src={searchIcon} width={0} height={0} alt="Ícone de pesquisar" />
                        </button>
                    </div>

                    <div className="pagesContainer">
                        <div className="pagesIconContainer">
                            <Link href="/carrinho"><Image src={marketIcon} width={0} height={0} alt="Ícone de carrinho" /></Link>
                        </div>
                        <div className="pagesIconContainer">
                            <Link href="/admin/add"><Image src={profileIcon} width={0} height={0} alt="Ícone de perfil" /></Link>
                        </div>
                    </div>
                </div>
            </header>
            <nav>
                <div className="navContainer">
                    <div className="navTextContainer">
                        <Link href="/produtos">
                            <p>Promoções</p>
                        </Link>
                    </div>
                    <div className="navTextContainer">
                        <Link href="/produtos?category=Green+Horta">
                            <p>Green Horta</p>
                        </Link>
                    </div>
                    <div className="navTextContainer bigger">
                        <Link href="/produtos?category=Green+Mercearia">
                            <p>Green Mercearia</p>
                        </Link>
                    </div>
                    <div className="navTextContainer bigger">
                        <Link href="/produtos?category=Bebidas+e+Lacticinios">
                            <p>Bebidas e Laticínios</p>
                        </Link>
                    </div>
                    <div className="navTextContainer">
                        <Link href="/produtos?category=Ovos+e+Carnes">
                            <p>Ovos e Carnes</p>
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    );
};
