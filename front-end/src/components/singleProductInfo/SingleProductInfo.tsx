'use client';
import "./SingleProductInfo.css"
import { ResponseFromApi } from "@/lib/types";
import { useState } from "react";


export default function SingleProductInfo ({ nome, categoria, tipo, preco }: {
    nome: string;
    categoria: string;
    tipo: string;
    preco: number;
}){
    const [ quantity, setQuantity ] = useState(0);

    const handleDecrement = ()=>{
        if(quantity>0) setQuantity(quantity-1);
    };
    const handleIncrement = ()=>{
        setQuantity(quantity+1);
    };

    return(
        <div className="singleProductInfo">
            <p className="singleProductInfo__category">{categoria} / {tipo}</p>
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
            <input type="button" value="ADICIONAR AO CARRINHO" className="singleProductInfo__button" />
        </div>
    )
}