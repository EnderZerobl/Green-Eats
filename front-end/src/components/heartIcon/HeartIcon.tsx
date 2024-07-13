'use client';
import "./HeartIcon.css"
import Image from "next/image";
import heartIcon from "@public/favoriteIcon.svg"
import heartIconFilled from "@public/filledFavoriteIcon.svg"
import { useState } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";


export default function HeartIcon () {
    const [ icon, setIcon ] = useState<StaticImport>(heartIcon);

    return(
        <button className="heart-icon" onClick={()=>{
            setIcon(icon===heartIcon?
                heartIconFilled
                :heartIcon
            )
        }}>
        <Image className="heart-icon__image" src={icon} width={0} height={0} alt="Ícone de perfil" />
        </button>
    )
}