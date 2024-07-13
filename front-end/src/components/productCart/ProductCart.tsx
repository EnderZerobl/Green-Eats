import favoriteIcon from "../../../public/favoriteIcon.svg";
import trashIcon from "../../../public/trash.svg";
import Image from "next/image";
import "../productCart/newProductCart.css";
import { ResponseFromApi, UsableCart } from "@/lib/types";

export default function ProductCart({data}: {
    data: UsableCart;
}) {
    const { produto, produtoId, id, quantidade } = data

    const options: React.JSX.Element[] = []

    for(let i = 1; i<=produto.estoque; i++) {
        options.push(
            <option value={i}>Quantidade: {i}</option>
        )
    }

    return(
        <>
            <div className="productCartCard">
                <div className="productCartCardImage">
                    <div className="discountCart">
                        <span>- 20%</span>
                    </div>
                    <div className="productCartCardImageContainer">
                        <Image src={produto.imagemPath as string} alt="Imagem do produto a venda" width={0} height={0} />
                    </div>
                </div>
                <div className="productCartCardText">
                    <div className="productCartCardTextTitle"><h1>Maça gala importada Orgânica - 500g</h1></div>
                    <div className="productCartCardTextPrice">
                        <div className="oldPrice"><p> R$ {produto.preco.toFixed(2).replace(".", ",")} </p></div>
                        <div className="currentPrice"><p> R$ {produto.precoNovo.toFixed(2).replace(".", ",")} </p></div>
                    </div>
                    <div className="productCartCardTextActions">
                        <select name="" id="">
                            {options}
                        </select>
                        <Image src={favoriteIcon} alt="ícone de favorito" width={24} height={22.4} />
                        <Image src={trashIcon} alt="Ícone de lixeira para remover produto do carrinho" width={0} height={0} />
                        
                    </div>
                </div>
            </div>
        </>
    )
};
