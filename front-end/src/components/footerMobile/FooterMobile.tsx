import Image from "next/image"
import Link from "next/link"
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
                    <Link href="/">
                        <Image src={homeIcon} alt="" width={0} height={0} />
                        <span>Ínicio</span>
                    </Link>
                    
                </div>
                <div className="footerIconContainer">
                    <Link href="/produtos">
                        <Image src={searchIcon} alt="" width={0} height={0} />
                        <span>Descubra</span>
                    </Link>

                </div>
                <div className="footerIconContainer">
                    <Link href="/carrinho">
                        <Image src={cartIcon} alt="" width={0} height={0} />
                        <span>Carrinho</span>
                    </Link>

                </div>
                <div className="footerIconContainer">
                    <Link href="/admin/add">
                        <Image src={profileIcon} alt="" width={0} height={0} />
                        <span>Conta</span>
                    </Link>
                </div>
                
            </footer>
        </>
    )
};
