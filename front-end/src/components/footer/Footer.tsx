'use client';
import { useState } from "react";
import "./Footer.css";
import "./dropdown-animation.css"
import youtubeIcon from "@public/youtube.svg";
import facebookIcon from "@public/facebook.svg";
import linkedinIcon from "@public/linkedin.svg";
import twitterIcon from "@public/twitter.svg";
import whatsappIcon from "@public/whatsapp.svg";
import instagramIcon from "@public/instagram.svg";
import arrowIcon from "@public/arrow.svg"
import Link from "next/link";
import Image from "next/image";

type DropdownProps = {
    title: string,
    desc: string
};

const FooterDropdown: React.FC<DropdownProps> = ({ title, desc }) => {
    return (
        <div className="footer-dropdown">
          <input type="checkbox" id={title} className="footer-dropdown__checkbox" />
          <label htmlFor={title} className="footer-dropdown__div">
            <h4 className="footer-dropdown__div__label">{title}</h4>
            <Image src={arrowIcon}
            alt="Ícone de seta"
            className="footer-dropdown__div__icon" 
            width={20} height={20}
            />
          </label>
          <p className="footer-dropdown__desc">{desc}
          </p>
          <span className="footer-dropdown__separation"></span>
        </div>
    );
  };

export default function Footer () {
    const dropdownData: DropdownProps[] = [
        {
            title: "Acessibilidade",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            title: "Compra segura",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            title: "Certificados",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            title: "Institucional",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            title: "Minha Conta",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
    ] 

    const dropdownList = dropdownData.map((prop, i) => (
        <FooterDropdown title={prop.title} desc={prop.desc} key={i} />
    ))
    return (
        <footer className="footer flexer">
            <section className="footer__section newsletter flexer">
                <h3 className="footer__section__title">Green News</h3>
                <span className="footer__section__text">Se inscreva e fique por dentro de ofertas exclusivas</span>
                <form className="footer__section__form flexer" action="POST">
                    <input type="text"
                     className="footer__section__form__input"
                     placeholder="Qual seu nome?" />
                    <input type="text"
                     className="footer__section__form__input"
                     placeholder="Seu email?" />
                    <input type="button"
                     className="footer__section__form__button generic-button"
                     value="CADASTRAR" />
                </form>
            </section>
            <section className="footer__section real-footer flexer">
                {dropdownList}
                <span className="real-footer__social-title">Midias Sociais</span>
                <ul className="real-footer__social">
                    <li className="real-footer__social__icon">
                        <Link href={"https://youtube.com"}>
                    <Image className="real-footer__social__icon__image" src={youtubeIcon} alt="Ícone do Yotube" />
                    </Link></li>
                    <li className="real-footer__social__icon">
                        <Link href={"https://youtube.com"}>
                    <Image className="real-footer__social__icon__image" src={facebookIcon} alt="Ícone do Facebook" />
                    </Link></li>
                    <li className="real-footer__social__icon">
                        <Link href={"https://youtube.com"}>
                    <Image className="real-footer__social__icon__image" src={linkedinIcon} alt="Ícone do Linkedin" />
                    </Link></li>
                    <li className="real-footer__social__icon">
                        <Link href={"https://youtube.com"}>
                    <Image className="real-footer__social__icon__image" src={twitterIcon} alt="Ícone do Twitter" />
                    </Link></li>
                    <li className="real-footer__social__icon">
                        <Link href={"https://youtube.com"}>
                    <Image className="real-footer__social__icon__image" src={whatsappIcon} alt="Ícone do Whatsapp" />
                    </Link></li>
                    <li className="real-footer__social__icon">
                        <Link href={"https://youtube.com"}>
                    <Image className="real-footer__social__icon__image" src={instagramIcon} alt="Ícone do Instagram" />
                    </Link></li>
                </ul>
            </section>
        </footer>
    )
}