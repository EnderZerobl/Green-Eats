import { RequisitionParams, ResponseFromApi } from '@/lib/types';
import axios from 'axios';



const getAllProducts = async (): Promise<ResponseFromApi[]> => {
    const response = await axios("http://localhost:3001/banco")

    return response.data;
};

const getProductByName = async (name: string): Promise<ResponseFromApi[]> => {
    const response = await axios(``)

    return [response.data]
}

const getProductById = async (id: string): Promise<ResponseFromApi[]> => {
    const response = await axios(`http://localhost:3001/produtos/${id}`);

    return [response.data];
}

const getProductByType = async ({ type, category }: RequisitionParams): Promise<ResponseFromApi[]>  => {
    const params = type?
    `tipos?tipos=${type}`
    :`categorias?categorias=${category}`;
    try{
        const response = await axios(`http://localhost:3001/produtos/busca/${params}`);
        return response.data
    } catch (error: any) {
        return []
    }
};

export async function getProducts ({
    name,
    type,
    category,
    id,
}: RequisitionParams): Promise<ResponseFromApi[]> {
    //if (name){
    //    return (await getProductByName(name))
    //};
    if (id) {
        return (await getProductById(id.toString()));
    };
    if ( type || category) {
        return (await getProductByType({ type, category }));
    };
    return (await getAllProducts());
};