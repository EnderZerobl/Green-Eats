'use client';
import "./SingleProductInfo.css"
import { ResponseFromApi } from "@/lib/types";
import { fetchCart } from "@/services/ManageCart";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function SingleProductInfo ({ id, nome, categoria, tipo, preco, imagemPath, exclusivo }: {
    id: number;
    nome: string;
    categoria: string;
    tipo: string;
    preco: number;
    imagemPath: string;
    exclusivo: boolean;
}){
    const [ quantity, setQuantity ] = useState(0);

    const router = useRouter();

    const handleDecrement = ()=>{
        if(quantity>0) setQuantity(quantity-1);
    };
    const handleIncrement = ()=>{
        setQuantity(quantity+1);
    };

    return(
        <div className="singleProductInfo">
            <p className="singleProductInfo__category">
                <Link href={"/"} >Green Eats / </Link>
                <Link href={"/produtos"+
                    exclusivo?
                    "?exclusive=true"
                    :""
                } >
                    {exclusivo?
                    "Exclusivo Green Eats"
                    :"Todos os Produtos"} /&nbsp;
                </Link>
                <Link href={"/produtos?category="+categoria} >{categoria} / </Link>
                <Link href={"/produtos?type="+tipo} >{tipo}</Link>
            </p>
            <h1 className="singleProductInfo__title">{nome}</h1>
            <span className="singleProductInfo__price">R$ {preco.toFixed(2).replace(".", ",")}</span>
            <div className="singleProductInfo__quantity">
                <label className="singleProductInfo__quantity__label">Quantidade:</label>
                <div className="singleProductInfo__quantity__counter">
                    <button className="singleProductInfo__quantity__counter__button" onClick={handleDecrement}>-</button>
                    <p className="singleProductInfo__quantity__counter__number">{quantity}</p>
                    <button className="singleProductInfo__quantity__counter__button" onClick={handleIncrement}>+</button>
                </div>
            </div>
            <input type="button" value="ADICIONAR AO CARRINHO" className="singleProductInfo__button" 
            onClick={async ()=>{
                await fetchCart("post", {id, quantidade:0})
                router.refresh();
            }}/>
        </div>
    )
}