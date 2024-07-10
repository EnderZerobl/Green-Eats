'use client';

import { ResponseFromApi, RequisitionParams } from "@/lib/types";
import { getProducts } from "@/services/GetProducts";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Filter from "../filter/Filter";
import ProductCatalogue from "../productCatalogue/ProductCatalogue";

export default function ClientSideProdutos ({}) {
    'use client';
    const [ data, setData ] = useState<ResponseFromApi[]>([]);
    const [ category, setCategory ] = useState("");
    const [ type, setType ] = useState("");
    const [ name, setName ] = useState("");
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
            if(params.has('name')){
                const newName = params.get('name') as string;
                setName(newName)
                requisitionParams.name = newName;
            } else {
                setName("")
            };
            
            const newData = await getProducts(requisitionParams);
            setData(newData);
        })()
    }, [params]);
    //const data = await getProducts({});
    return(
        <>
            <span className="little-text">{`Green Eats${
            category && ` / ${category}`}${
            type && ` / ${type}`}${
            name && ` / ${name}`}`}</span>
            <Filter />
            <ProductCatalogue data={data} />
        </>
    )
}