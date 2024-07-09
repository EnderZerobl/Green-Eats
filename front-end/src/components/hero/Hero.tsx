'use client';
import './Hero.css';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import { Simplify, HeroImageSliceDefaultPrimary, DataDocument } from '../../../prismicio-types';
import Slider from 'react-slick';

function HeroElment({ data }: {
    data: Simplify<HeroImageSliceDefaultPrimary>
}) {

    const textTogether = data?.texto.map((text, i) => (
        i % 2?
        <span className='green' key={i}>{text.parte_do_texto}</span>
        : <span key={i}> {text.parte_do_texto} </span>
    ));

    return(
        <section className="hero">
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

function NextArrow(props: any) {
    const { onClick } = props;
    return (
        <div className="arrow next" onClick={onClick}>
            &#9654;
        </div>
    );
}

function PrevArrow(props: any) {
    const { onClick } = props;
    return (
        <div className="arrow prev" onClick={onClick}>
            &#9664;
        </div>
    );
}

export default function Hero({ page }: {
    page: DataDocument<string>
}) {
    // Carousel settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    return (
        <Slider {...settings}>
            {page.data.slices
                .filter(slice => slice.variation === "default")
                .map((slice, i) => (
                    <HeroElment data={slice.primary} key={i}></HeroElment>
                ))}
        </Slider>
    );
}
