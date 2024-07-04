import "./discovery.css"
import { createClient } from "@/prismicio";
import { PrismicNextImage } from "@prismicio/next";


export default async function Discovery () {
    const client = createClient();

    const page = await client.getSingle("data");

    //@ts-ignore
    const data: Simplify<HeroImageSliceDiscoveryPrimary> = page.data.slices
    .filter((slice)=>(slice.variation==="discovery"))[0]?.primary;


    
    return (
        <section className="discovery-section">
            <h2 className="discovery-section__title"></h2>
            <div className="discovery-section__content">
                <PrismicNextImage
                className='discovery-section__content__image'
                height={1440}
                width={625}
                field={data.imagem} />

                <div className='discovery-section__content__content'>

                    <h2 className='discovery-section__content__content__title green'>
                        {data.title}
                    </h2>
                    <p className="discovery-section__content__content__text">
                        {data.text}
                    </p>
                </div>
            </div>
        </section>
    )
}