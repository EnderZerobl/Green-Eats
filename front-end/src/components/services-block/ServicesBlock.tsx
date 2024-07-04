import React from 'react';
import "./ServicesBlock.css";
import TruckIcon from "@public/truck.svg";
import QualityIcon from "@public/quality.svg";
import HeadsetIcon from "@public/headset.svg"
import Image from 'next/image';

export default function ServiceBlock () {

    return (
        <>
        <div className='service-container'>
            <div className="service-container__element">
                <span className="service-container__element__icon">
                    <Image src={TruckIcon} alt="ícone de um caminhão" />
                </span>
                <div className="service-container__element__text">
                    <h4 className='service-container__element__text__title'>FRETE GRÁTIS</h4>
                    <span className="service-container__element__text__text">a partir de R$250,00</span>
                </div>
            </div>
            <div className="service-container__element">
                <span className="service-container__element__icon">
                <Image src={QualityIcon} alt="ícone de uma medalha" /></span>
                <div className="service-container__element__text">
                    <h4 className='service-container__element__text__title'>SELO DE QUALIDADE</h4>
                    <span className="service-container__element__text__text">produtos orgânicos 100% certificados</span>
                </div>
            </div>
            <div className="service-container__element">
                <span className="service-container__element__icon">
                <Image src={HeadsetIcon} alt="ícone de um fone de ouvidos" /></span>
                <div className="service-container__element__text">
                    <h4 className='service-container__element__text__title'>ATENDIMENTO ONLINE</h4>
                    <span className="service-container__element__text__text">Seg a Sex das 08h as 18h via WhatsApp</span>
                </div>
            </div>
        </div>
        <p className="text-below-container">Entrega rápida! Peça hoje e receba amanhã. Consulte informações</p>
        </>
    )
}