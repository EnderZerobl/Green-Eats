import { createClient } from '@/prismicio';
import './Hero.css';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import { Simplify, HeroImageSliceDefaultPrimary } from '../../../prismicio-types';

export default async function Hero() {
    const client = createClient();

    const page = await client.getSingle("data");

    //@ts-ignore
    const data: Simplify<HeroImageSliceDefaultPrimary> = page.data.slices
    .filter((slice)=>(slice.variation==="default"))[0]?.primary;

    const textTogether = data?.texto.map((text, i) => (
        i % 2?
        <span className='green' key={i}>{text.parte_do_texto}</span>
        : <span key={i}> {text.parte_do_texto} </span>
    ));

    return (
        <section className='hero'>

            <PrismicNextImage
            className='hero__image'
            height={800}
            width={500}
            field={data?.imagem} />

            <div className='hero__content'>

                <h2 className='hero__content__text'>
                    {textTogether}
                </h2>

                <PrismicNextLink
                className='hero__content__button generic-button'
                field={data?.link}>
                    {data?.link_label}
                </PrismicNextLink>
                
            </div>

        </section>
    )
}