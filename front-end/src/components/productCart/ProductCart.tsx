import appleProduct from "../../../public/appleProduct.svg"
import favoriteIcon from "../../../public/favoriteIcon.svg"
import trashIcon from "../../../public/trash.svg"
import Image from "next/image"
import "../productCart/productCart.css"

export default function ProductCart() {
    return(
        <>
            <div className="productCartCard">
                <div className="productCartCardImage">
                    <div className="discountCart">
                        <span>- 20%</span>
                    </div>
                        <Image src={appleProduct} alt="Imagem do produto a venda" width={190} height={0} />
                </div>
                <div className="productCartCardText">
                    <div className="productCartCardTextTitle"><h1>Maça gala importada Orgânica - 500g</h1></div>
                    <div className="productCartCardTextPrice">
                        <div className="oldPrice"><p> R$ 20,00 </p></div>
                        <div className="currentPrice"><p> R$ 16,90 </p></div>
                    </div>
                    <div className="productCartCardTextActions">
                        <select name="" id="">
                            <option value="1">Quantidade: 1</option>
                        </select>
                        <Image src={favoriteIcon} alt="ícone de favorito" width={24} height={22.4} />
                        <Image src={trashIcon} alt="Ícone de lixeira para remover produto do carrinho" width={0} height={0} />
                        
                    </div>
                </div>
            </div>
        </>
    )
};
