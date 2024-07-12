'use client';

import { ResponseFromApi, RequisitionParams, HigherData } from "@/lib/types";
import { getProducts } from "@/services/GetProducts";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Filter from "../filter/Filter";
import ProductCatalogue from "../productCatalogue/ProductCatalogue";
import AdminPage from "../adminPage/AdminPage";

export default function ClientSideProdutos ({ higherData }: {
    higherData: HigherData
}) {
    'use client';
    const [ data, setData ] = useState<ResponseFromApi[]>([]);
    const [ category, setCategory ] = useState("");
    const [ type, setType ] = useState("");
    const [ characteristics, setCharacteristics ] = useState("")
    const [ name, setName ] = useState("");
    const [ displayAddModal, setDisplayAddModal ] = useState(false);
    const [ displayEditModal, setDisplayEditModal ] = useState(false);
    const [ dataToEdit, setDataToEdit ] = useState<ResponseFromApi[]>([])
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

            if(params.has('name')){
                const newName = params.get('name') as string;
                setName(newName)
                requisitionParams.name = newName;
            } else {
                setName("")
            };

            if (requisitionParams.type || requisitionParams.id || requisitionParams.name || !(requisitionParams.category)){
                const newData = await getProducts(requisitionParams);
                setData(newData);
            } else {
                //@ts-ignore
                setData(higherData[requisitionParams.category])
            }
        })()
    }, [params, higherData]);
    //const data = await getProducts({});
    return(
        <>
            <span className="little-text">{`Green Eats${
            category && ` / ${category}`}${
            type && ` / ${type}`}${
            name && ` / ${name}`}`}</span>
            <Filter higherData={higherData} />
            <ProductCatalogue data={data} 
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