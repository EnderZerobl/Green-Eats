import Image from "next/image"
import homeIcon from "@public/homeIconMobile.svg"
import searchIcon from "@public/searchIconFooterMobile.svg"
import cartIcon from "@public/cartIconMobile.svg"
import profileIcon from "@public/profileIconMobile.svg"
import "@/components/footerMobile/footerMobile.css"

export default function FooterMobile() {
    return(
        <>
            <footer className="footerMobile">
                <div className="footerIconContainer">
                    <Image src={homeIcon} alt="" width={0} height={0} />
                    <span>Ínicio</span>
                </div>
                <div className="footerIconContainer">
                    <Image src={searchIcon} alt="" width={0} height={0} />
                    <span>Descubra</span>

                </div>
                <div className="footerIconContainer">
                    <Image src={cartIcon} alt="" width={0} height={0} />
                    <span>Carrinho</span>

                </div>
                <div className="footerIconContainer">
                    <Image src={profileIcon} alt="" width={0} height={0} />
                    <span>Conta</span>
                </div>
                
            </footer>
        </>
    )
};
