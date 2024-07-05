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
    const params = useSearchParams();


    useEffect(()=>{
        (async ()=>{

            const requisitionParams: RequisitionParams= {};

            if(params.has('category'))requisitionParams.category = params.get('category') as string;
            if(params.has('type'))requisitionParams.type = params.get('type') as string;
            if(params.has('name'))requisitionParams.name = params.get('name') as string;
            
            const newData = await getProducts(requisitionParams)
            setData(newData)
        })()
    }, [params])
    //const data = await getProducts({});
    return(
        <>
            <Filter />
            <ProductCatalogue data={data} />
        </>
    )
}