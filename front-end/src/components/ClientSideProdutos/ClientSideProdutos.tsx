'use client';

import { ResponseFromApi, RequisitionParams, HigherData } from "@/lib/types";
import { getProducts } from "@/services/GetProducts";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Filter from "../filter/Filter";
import ProductCatalogue from "../productCatalogue/ProductCatalogue";
import AdminPage from "../adminPage/AdminPage";
import { order as staticOrder } from "@/lib/static-data";
import "./ClientSideProdutos.css"
import filterIcon from "@public/filterIcon.svg"
import Image from "next/image";

export default function ClientSideProdutos ({ higherData }: {
    higherData: HigherData
}) {
    'use client';
    const [ data, setData ] = useState<ResponseFromApi[]>([]);
    const [ category, setCategory ] = useState("");
    const [ type, setType ] = useState("");
    const [ characteristics, setCharacteristics ] = useState("");
    const [ order, setOrder ] = useState("")
    const [ name, setName ] = useState("");
    const [ displayAddModal, setDisplayAddModal ] = useState(false);
    const [ displayEditModal, setDisplayEditModal ] = useState(false);
    const [ dataToEdit, setDataToEdit ] = useState<ResponseFromApi[]>([])
    const [ checked, setChecked ] = useState(false);

    const params = useSearchParams();

    //atualização dos dados de acordo com os query params da url
    useEffect(()=>{
        (async ()=>{

            const requisitionParams: RequisitionParams= {};

            if(params.has('category')){
                const newCategory = params.get('category') as string;
                setCategory(newCategory);
                requisitionParams.category = newCategory;
            } else {
                setCategory("")
            };

            if(params.has('type')){
                const newType = params.get('type') as string;
                setType(newType);
                requisitionParams.type = newType
            } else {
                setType("")
            };

            if (params.has("characteristic")) {
                const newCharac = params.get("characteristic") as string;
                setCharacteristics(newCharac);
                requisitionParams.characteristics = newCharac
            } else {
                setName("")
            }

            if (params.has('name')){
                const newName = params.get('name') as string;
                setName(newName)
                requisitionParams.name = newName;
            } else {
                setName("")
            };

            if (params.has("order")) {
                const newOrder = params.get("order") as string;
                setOrder(newOrder);
                requisitionParams.order = newOrder;
            } else {
                setOrder("");
            }

            if (requisitionParams.type || requisitionParams.id 
                || requisitionParams.name || requisitionParams.order
                || !(requisitionParams.category)){
                let newData = await getProducts(requisitionParams);
                    
                if (params.has("order")) {
                    const ordenation = requisitionParams.order as string;
                    const index = staticOrder.indexOf(ordenation)

                    switch (index) {
                        case 0:
                            newData = newData
                            .filter(elem=>elem.estoque)
                            .sort((elem, keep) => {
                                return elem.estoque - keep.estoque
                            });
                            break
                        case 1:
                            newData = newData
                            .filter(elem=>elem.estoque)
                            .sort((elem, keep) => {
                                return elem.precoNovo - keep.precoNovo
                            });
                            break
                        case 2:
                            newData = newData
                            .filter(elem=>elem.estoque)
                            .sort((elem, keep) => {
                                return keep.precoNovo - elem.precoNovo
                            });
                            break;
                        case 3:
                            newData = newData
                            .filter(elem=>elem.estoque)
                            .reverse()
                            break;

                    }
                }

                if (params.has("exclusive")) {
                    const exclusivity = params.get("exclusive")
                    if(exclusivity === 'true'){
                        newData = newData.filter(prod => prod.exclusivo)
                    } else {
                        newData = newData.filter(prod => prod.desconto);
                    }
                }

                setData(newData);
            } else {
                    let dataToUse = higherData
                if (params.has("exclusive")) {
                    const exclusivity = params.get("exclusive")
                    if(exclusivity === 'true'){
                        dataToUse["Green Horta"] = dataToUse["Green Horta"].filter(prod => prod.exclusivo);
                        dataToUse["Green Mercearia"] = dataToUse["Green Horta"].filter(prod => prod.exclusivo);
                        dataToUse["Bebidas e Laticinios"] = dataToUse["Green Horta"].filter(prod => prod.exclusivo);
                        dataToUse["Ovos e Carnes"] = dataToUse["Green Horta"].filter(prod => prod.exclusivo);
                    } else {
                        dataToUse["Green Horta"] = dataToUse["Green Horta"].filter(prod => prod.desconto);
                        dataToUse["Green Mercearia"] = dataToUse["Green Horta"].filter(prod => prod.desconto);
                        dataToUse["Bebidas e Laticinios"] = dataToUse["Green Horta"].filter(prod => prod.desconto);
                        dataToUse["Ovos e Carnes"] = dataToUse["Green Horta"].filter(prod => prod.desconto);
                    }
                }
                //@ts-ignore
                setData(dataToUse[requisitionParams.category])
            }
        })()
    }, [params, higherData]);

    const catalogueQuantity = (
        <span className="catalogue-quantity">
            {data.length} Produtos
        </span>
    )

    return(
        <>
            <input type="checkbox" className="toggle-filter" id="toggle-filter" 
            name="toggle-filter" checked={checked} onClick={()=>setChecked(true)} />
            <label htmlFor="toggle-filter" className="toggle-filter-label">
                <i className="toggle-filter-label__image-container">
                    <Image className="toggle-filter-label__image-container__image"
                    src={filterIcon} alt="Ícone de filtro"
                    width={16} height={16} />
                </i>
                <span> Filtro</span>
            </label>
            <div className="little-catalogue-text">
                <span className="little-text">{`Green Eats
                ${category && ` / ${category}`}
                ${type && ` / ${type}`}
                ${name && ` / ${name}`}`}
                </span>

                {catalogueQuantity}
            </div>
            <Filter higherData={higherData} close={()=>setChecked(false)} />
            <ProductCatalogue data={data} catalogueQuantity={catalogueQuantity}
            toggleAddModal={()=>{setDisplayAddModal(true)}}
            toggleEditModal={(data: ResponseFromApi)=>{
                setDataToEdit([data])
                setDisplayEditModal(true)
                }} />
            {displayAddModal && <AdminPage type="add" close={()=>{setDisplayAddModal(false)}} />}
            {displayEditModal && <AdminPage type="edit" data={dataToEdit[0]} close={()=>{setDisplayEditModal(false)}}/>}
        </>
    )
}