'use client';
import { FormEvent, useState } from 'react';
import './AdminPage.css'
import Image from 'next/image';
import { changeProduct, createNewProduct, deleteProduct } from '@/services/CreateOrChangeProducts';
import { categorysList, characteristics } from '@/lib/static-data';

export default function AdminPage ({ type, close, data }: {
    type: "add" | "edit";
    close: ()=>void;
    data?: {
        id: number;
        nome: string;
        imagemPath: string | File;
        desconto: number;
        preco: number;
        categoria: string;
        armazen?: string;
        desc?: string;
    }
}) {
    const [ image, setImage ] = useState<string>(data? data.imagemPath as string : "");
    const [ deleteItem, setDeleteItem ] = useState(false)
    const [ selectedCategory, setSelectedCategory ] = useState(data? data.categoria : categorysList[0].name)
    const [ typesToSelect, setTypesToSelect ] = useState<string[]>(categorysList.filter(elem=>(
        elem.name === selectedCategory
    ))[0].types)

    if(data) data.imagemPath = "";
    const submitProduct = (e:FormEvent<HTMLFormElement>)=>{
         if (type === "edit" && deleteItem && data) deleteProduct(data.id)
        
        if (image){
            const formData = new FormData(e.currentTarget);
            const formToSend = new FormData();
            formToSend.append("nome", formData.get('nome') as string);
            formToSend.append("categoria", formData.get('categoria') as string);
            formToSend.append("tipo", formData.get('tipo') as string);
            formToSend.append("descricaoContent", formData.get('descricao') as string);
            formToSend.append("armazenContent", formData.get('informacoes') as string);
            formToSend.append(formData.get('caracteristicas') as string, 'true'); 
            formToSend.append("preco", formData.get('preco') as string);
            formToSend.append("desconto", formData.get('desconto') as string);
            formToSend.append("exclusivo", formData.get('type-of-products') as string);
            formToSend.append("estoque", formData.get('estoque') as string);
            formToSend.append("image", formData.get('image') as File);

            if(type === "add"){
                createNewProduct(formToSend);
            } else if (data) {
                changeProduct(data.id, formToSend);
            };
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
        <>
        <div className='modal-wrapper'>
        <div className="outside-modal"
        onClick={close}></div>
        <div className="modal">
            <h1 className="modal__title">{type === "add" ? "Criação de Produto" : "Edição de Produto"}</h1>
            <form action="" onSubmit={submitProduct} method="post" className="modal__form flexer">
                <div className="form-container">

                <div className="modal__form__left">
                    <div className="modal__form__image-preview">
                        <Image id="image-preview" src={image} alt="Preview"
                        width={500} height={500} />
                    </div>
                    <label htmlFor="image" className='modal__form__image-label generic-button'>
                        Enviar Imagem
                    </label>
                    {image?
                    <input type="file" className="modal__form__image-button"
                    name="image" id="image" onChange={handleImageChange} />
                    :<input type="file" className="modal__form__image-button"
                     name="image" id="image" onChange={handleImageChange}
                     required/>}
                    
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
                        <div className="modal__form__stock">
                            <label htmlFor="desconto">Estoque:</label>
                            <div className="modal__form__stock-input">
                                <input type="number" id="estoque" name="estoque" min="0" max="100"
                                defaultValue={data? data.desconto : 0} />
                            </div>
                        </div>
                    </div>
                    <div className="modal__form__category">
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
                    </div>
                            
                    <div className="modal__form__type">
                        <label htmlFor="tipo">Tipo:</label>
                        <select id="tipo" name="tipo" required>
                            {typesToSelect.map((name)=>(
                                <option value={name} key={name}>{name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="modal__form__type select-characteristics">
                        <label htmlFor="caracteristica">Caracteristica:</label>
                        <select id="caracteristica" name="caracteristica" required>
                            {characteristics.map((name)=>(
                                <option value={name} key={name}>{name}</option>
                            ))}
                        </select>
                    </div>
    
                    <label htmlFor="descricao">Descrição do Produto:</label>
                    <textarea id="descricao" name="descricao" placeholder="Digite algo" 
                    defaultValue={data? data.desc : ""} required></textarea>
    
                    <label htmlFor="informacoes">Informações de armazenamento (Opcional):</label>
                    <textarea id="informacoes" name="informacoes" placeholder="Digite algo"
                    defaultValue={data? data.armazen : ""}></textarea>
                </div>
                </div>
                <div className="modal__form__right__radio">
                    <div className="modal__form__right__radio__container">
                        <input type="radio" name="type-of-products" id="exclusive-products" className="modal__form__right__radio__container__input" value={"true"}/>
                        <label htmlFor="exclusive-products" className="modal__form__right__radio__container__label">Exclusivo Green Eats</label>
                    </div>
                    <div className="modal__form__right__radio__container">
                        <input type="radio" name="type-of-products" id="all-products" className="modal__form__right__radio__container__input" value={"false"}/>
                        <label htmlFor="all-products" className="modal__form__right__radio__container__label">Todos os Produtos</label>
                    </div>
                </div>
                <div className='modal__form__submit'>
                    {type==="edit" &&
                    <input type="submit" className="modal__form__submit__button"
                    value="APAGAR PRODUTO" 
                    onClick={()=>{setDeleteItem(true)}}/>}
                    <input type="submit" className="modal__form__submit__button" 
                    value={type==="add"?
                        "CRIAR PRODUTO"
                        :"EDITAR PRODUTO"}
                    onClick={()=>{setDeleteItem(false)}} 
                    />
                </div>
            </form>
        </div>
        </div>
        </>
    );  
};