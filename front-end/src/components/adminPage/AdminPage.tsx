'use client';
import { FormEvent, useState } from 'react';
import './AdminPage.css'
import Image from 'next/image';
import { createNewProduct } from '@/services/CreateOrChangeProducts';
import { PartialParamsToCreate } from '@/lib/types';
import { categorysList } from '@/lib/static-data';

export default function AdminPage ({ type, data }: {
    type: "add" | "edit";
    data?: {
        nome: string,
        imagemPath: string;
        desconto: number;
        preco: number;

    }
}) {
    const [ image, setImage ] = useState<string>(data? data.imagemPath : "");
    const [ imgFile, setImgFile ] = useState<File>()
    const [ selectedCategory, setSelectedCategory ] = useState("")
    const [ typesToSelect, setTypesToSelect ] = useState<string[]>([])

    if(data) data.imagemPath = "";
    const submitProduct = (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);
        if (imgFile){
            const productData: PartialParamsToCreate = {
                nome: formData.get('nome') as string,
                desconto: parseInt(formData.get('desconto') as string),
                preco: parseFloat(formData.get('preco') as string),
                categoria: formData.get('categoria') as string,
                tipo: formData.get('tipo') as string,
                descricaoContent: formData.get('descricao') as string,
                armazenContent: formData.get('informacoes') as string,
                imagemPath: imgFile,
            };
            if(type === "add"){
                createNewProduct(productData);
            }
        }

    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = (e) => {
                if(reader.result){
                    setImage(reader.result.toString());
                }
            }
            reader.readAsDataURL(file);
        }
    }

    return (
        <div className="modal">
            <h1 className="modal__title">{type === "add" ? "Criação de Produto" : "Edição de Produto"}</h1>
            <form action="" onSubmit={submitProduct} method="post" className="modal__form flexer">
                <div className="form-container">

                <div className="modal__form__left">
                    <div className="modal__form__image-preview">
                        <Image id="image-preview" src={image} alt="Preview"
                        width={500} height={500} />
                    </div>
                    <input type="file" className="modal__form__image-button"
                     name="image" id="image-button" onChange={handleImageChange}
                     required/>
                </div>
                <div className="modal__form__right">
                    <label htmlFor="nome">Nome:</label>
                    <input type="text" id="nome" name="nome" placeholder="Nome do Produto"
                    defaultValue={data? data.nome : ""} required />
                    
                    <div className="modal__form__discount-price">
                        <div className="modal__form__discount">
                            <label htmlFor="desconto">Desconto (Opcional):</label>
                            <div className="modal__form__discount-input">
                                <input type="number" id="desconto" name="desconto" min="0" max="100"
                                defaultValue={data? data.desconto : 0} />
                                <div className="modal__form__discount-sign">%</div>
                            </div>
                        </div>
                        <div className="modal__form__price">
                            <label htmlFor="preco">Preço:</label>
                            <div className="modal__form__price-input">
                                <span className="modal__form__price-currency">R$</span>
                                <input type="number" id="preco" name="preco" step="0.01"
                                defaultValue={data? data.preco: "0.00"} required/>
                            </div>
                        </div>
                    </div>
                    
                    <label htmlFor="categoria">Categoria:</label>
                    <select id="categoria" name="categoria" onChange={e=>{
                        setSelectedCategory(e.target.value);
                        setTypesToSelect(categorysList.filter(elem=>elem.name===e.target.value)
                                                      [0].types);
                    }} required>
            
                        {categorysList.map(({name})=>(
                            <option value={name} key={name}>{name}</option>
                        ))}
                    </select>
    
                    <label htmlFor="tipo">Tipo:</label>
                    <select id="tipo" name="tipo" required>
                        {typesToSelect.map((name)=>(
                                <option value={name} key={name}>{name}</option>
                            ))}
                    </select>
    
                    <label htmlFor="descricao">Descrição do Produto:</label>
                    <textarea id="descricao" name="descricao" placeholder="Digite algo" required></textarea>
    
                    <label htmlFor="informacoes">Informações de armazenamento (Opcional):</label>
                    <textarea id="informacoes" name="informacoes" placeholder="Digite algo"></textarea>
                </div>
                </div>
                <input type="submit" className="modal__form__submit-button" value="CRIAR PRODUTO" />
            </form>
        </div>
    );  
};