"use client"

import './Header.css';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import searchIcon from "@public/search.svg";
import searchIconMobile from "@public/searchIconMobile.svg";
import marketIcon from "@public/market.svg";
import profileIcon from "@public/profile.svg";
import menuBurguer from "@public/burguerMenu.svg"
import { useRouter } from 'next/navigation';

export default function Header() {
    const [search, setSearch] = useState("");
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const inputRef = useRef(null);
    const buttonRef = useRef(null);

    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                inputRef.current &&
                !(inputRef.current as any).contains(event.target) &&
                buttonRef.current &&
                !(buttonRef.current as any).contains(event.target)
            ) {
                setIsSearchActive(false);
            }
        };

        if (isSearchActive) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSearchActive]);

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
            <div className="headerDesktop">
                <header>
                    <div className="topContentContainer">
                        <div className="logo">
                            <Link href="/" className='logo__link'>Green Eats</Link>
                        </div>
                        <div className="searchContainer">
                            <input type="text" placeholder="Nome do produto"
                                className="searchInput" value={search} onChange={e => {
                                    setSearch(e.target.value)
                                }} />
                            <button className="searchIconContainer"
                                onClick={() => {
                                    if (search) {
                                        router.push("/produtos?name=" + search)
                                    }
                                }}>
                                <Image src={searchIcon} width={24} height={24} alt="Ícone de pesquisar" />
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
                            <Link href="/produtos?order=Menor+preço">
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
                            <Link href="/produtos?category=Bebidas+e+Laticinios">
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
            </div>

            <div className="headerMobile">
                <header>
                    <div className="topContentContainerMobile">
                        {isSearchActive ? (
                            <>
                                <div className="searchContainerMobile">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        className="searchInput"
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                        placeholder="Nome do produto"
                                    />
                                    <button
                                        ref={buttonRef}
                                        className="searchIconContainer"
                                        onClick={() => {
                                            if (search) {
                                                router.push("/produtos?name=" + search)
                                            }
                                        }}>
                                        <Image src={searchIcon} width={24} height={24} alt="Ícone de pesquisar" />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="leftActions">
                                    <Image
                                        src={menuBurguer}
                                        width={25}
                                        height={25}
                                        alt="Menu burguer"
                                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    />
                                    <Link href="/admin/add">  <Image src={profileIcon} width={25} height={25} alt="Ícone de perfil" /> </Link>
                                </div>
                                <div className="logoMobile">
                                    <Link href="/" className='logo__link__mobile'>Green Eats</Link>
                                </div>
                                <div className="rightActions">
                                    <Image
                                        src={searchIconMobile}
                                        width={25}
                                        height={25}
                                        alt="ícone de pesquisa"
                                        onClick={() => setIsSearchActive(true)}
                                    />
                                    <Link href="/carrinho">  <Image src={marketIcon} width={25} height={25} alt="ícone de carrinho" /> </Link>
                                </div>
                            </>
                        )}
                    </div>
                    
                </header>
                
            </div>
            
            {isMenuOpen && (
                    <div className="menuContainer">
                        <nav>
                            <div className="navContainerMenu">
                                <div className="navTextContainer">
                                    <Link href="/produtos?order=Menor+preço">
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
                                    <Link href="/produtos?category=Bebidas+e+Laticinios">
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
                    </div>
                )}

                <nav className="navHeaderMobile">
                    <div className="navContainer">
                        <div className="navTextContainer">
                            <Link href="/produtos?order=Menor+preço">
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
                            <Link href="/produtos?category=Bebidas+e+Laticinios">
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
}
