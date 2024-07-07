'use server';

import AdminPage from "@/components/adminPage/AdminPage";
import { getProducts } from "@/services/GetProducts";

export default async function Page ({ params }: {
    params:{
        id: string
    }
}) {

    const product = await getProducts({id: parseInt(params.id)})

    return (
        <AdminPage type={"edit"} data={product[0]}/>
    )
}