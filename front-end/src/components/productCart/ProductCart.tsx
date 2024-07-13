'use client';
import favoriteIcon from "../../../public/favoriteIcon.svg";
import trashIcon from "../../../public/trash.svg";
import Image from "next/image";
import "../productCart/newProductCart.css";
import { UsableCart } from "@/lib/types";
import { fetchCart } from "@/services/ManageCart";
import { useRouter } from "next/navigation";
import { ChangeEventHandler } from "react";

export default function ProductCart({data}: {
    data: UsableCart;
}) {
    const { produto, produtoId, id, quantidade } = data

    const router = useRouter();

    const options: React.JSX.Element[] = []

    for(let i = 1; i<=produto.estoque; i++) {
        options.push(
            quantidade===i?
            <>
                <option className="" value={i} defaultChecked>{i}</option></>
            :<>
                <option className="" value={i}>{i}</option></>
        )
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (parseInt(e.target.value) !== quantidade) {
            fetchCart("put", {
                id,
                quantidade: parseInt(e.target.value)
            })
            router.refresh();
        }
    }

    return(
        <>
            <div className="productCartCard">
                <div className="productCartCardImage">
                    {   
                        produto.desconto?
                        <div className="discountCart">
                             <span>- {produto.desconto}%</span>
                        </div>
                        :<div></div>
                    }
                    <div className="productCartCardImageContainer">
                        <Image src={produto.imagemPath as string} alt="Imagem do produto a venda" width={0} height={0} />
                    </div>
                </div>
                <div className="productCartCardText">
                    <div className="productCartCardTextTitle"><h1>{produto.nome}</h1></div>
                    <div className="productCartCardTextPrice">
                        {
                            produto.desconto?
                            <div className="oldPrice"><p> R$ {produto.preco.toFixed(2).replace(".", ",")} </p></div>
                            :<></>
                        }
                        <div className="currentPrice"><p> R$ {produto.precoNovo.toFixed(2).replace(".", ",")} </p></div>
                    </div>
                    <div className="productCartCardTextActions">
                        <div className="producCartCardTextActionsContainer">
                            <span className="productCartCardTextActionsContainerLabel">Quantidade:</span> 
                            <select onChange={handleQuantityChange}
                             name="" id="">
                                {options}
                            </select>
                        </div>
                        <div className="productCartCardTextActionsIcons">
                            <button><Image src={favoriteIcon} alt="ícone de favorito" width={24} height={22.4} /></button>
                            <button onClick={()=>{
                                fetchCart("delete", {id, quantidade:0})
                                router.refresh();
                            }}>
                                    <Image src={trashIcon} alt="Ícone de lixeira para remover produto do carrinho" width={0} height={0} />
                            </button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
};
