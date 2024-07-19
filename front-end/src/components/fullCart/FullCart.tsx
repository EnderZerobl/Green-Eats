import React, { useEffect, useState } from 'react';
import { UsableCart } from "@/lib/types";
import "../fullCart/newFullCart.css";
import ProductCart from "../productCart/ProductCart";

export default function FullCart({ shopCart, total }: {
    shopCart: UsableCart[];
    total: {
        totalComDesconto: number;
        totalSemDesconto: number;
        Desconto: number
    };
}) {
    const freeShippingThreshold = 256.00;
    const amountNeeded = freeShippingThreshold - total.totalComDesconto;
    const progressPercentage = (total.totalComDesconto / freeShippingThreshold) * 100;

    return (
        <>
            <section className="fullCart">
                <section className="productCart">
                    <h1 className="sectionTitle">Seu carrinho</h1>
                    {
                        shopCart.map(product => (
                            <ProductCart key={product.id}
                                data={product} />
                        ))
                    }
                </section>
                <section className="orderResume">
                    <h1 className="sectionTitle">Resumo do pedido</h1>
                    <div className="orderResumeTextContainer">
                        <div className="orderResumeText"><p>Produtos</p></div>
                        <div className="orderResumePrice"><p>R$ {total.totalSemDesconto.toFixed(2).replace(".", ",")}</p></div>
                    </div>
                    <div className="orderResumeTextContainer">
                        <div className="orderResumeText"><p>Desconto</p></div>
                        <div className="orderResumePrice"><p>R$ {total.Desconto.toFixed(2).replace(".", ",")}</p></div>
                    </div>
                    <div className="orderResumeTextContainer .strong">
                        <div className="orderResumeText final-price"><p>Preço estimado:</p></div>
                        <div className="orderResumePrice final-price"><p><strong>R$ {total.totalComDesconto.toFixed(2).replace(".", ",")}</strong></p></div>
                    </div>
                    <button>FINALIZAR PEDIDO</button>
                    <div className="shipping-info">
                        <p>Faltam <span className="amount-needed">R$ {amountNeeded.toFixed(2).replace(".", ",")}</span> para ganhar <span>Frete Grátis</span></p>
                        <div className="progress-bar">
                            <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
                        </div>
                    </div>
                </section>
            </section>
        </>
    );
};
