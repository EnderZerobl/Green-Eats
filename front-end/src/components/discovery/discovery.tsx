import "./discovery.css"
import { createClient } from "@/prismicio";
import Image from "next/image";


export default async function Discovery () {

    
    return (
        <section className="discovery-section">
            <h2 className="discovery-section__title">Conheça também</h2>
            <div className="discovery-section__content">
                <Image
                className='discovery-section__content__image'
                height={625}
                width={1440}
                src={"/saleImage.png"}
                alt="Foto de uma garrafa de mel com maças" />
                

                <div className='discovery-section__content__content'>

                    <h2 className='discovery-section__content__content__title green'>
                    GREEN EATS EXCLUSIVOS:
                    </h2>
                    <p className="discovery-section__content__content__text">
                    PRODUTOS ORIGINAIS COM DESCONTOS DE ATÉ 50%.
                    </p>
                </div>
            </div>
        </section>
    )
}