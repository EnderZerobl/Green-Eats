import { createClient } from '@/prismicio';
import './Hero.css';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';

export default async function Hero() {
    const client = createClient();

    const page = await client.getSingle("data");

    const data = page.data.slices[0]?.primary;

    const coisa = data?.texto.map((text, i) => (
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
                    {coisa}
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