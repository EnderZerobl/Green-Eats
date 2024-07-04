import { ResponseFromApi } from '@/lib/types';
import axios from 'axios';

type requisitionParams = {
    type?: string;
    category?: string;
    id?: number;
};

const getAllProducts = async () => {
    const response = await axios("http://localhost:3001/banco")

    return response;
};

const getProductById = async (id: string) => {
    const response = await axios(`http://localhost:3001/produtos/${id}`);

    return response;
}

const getProductByType = async ({ type, category }: requisitionParams) => {
    const params = type?
    `tipo/${type}`
    :`categorias/${category}`;

    const response = axios(`http://localhost:3001/produtos/${params}`);

    return response;
};

export async function getProducts ({
    type,
    category,
    id,
}: requisitionParams): Promise<ResponseFromApi> {
    if (id) {
        return (await getProductById(id.toString())).data;
    };
    if ( type || category) {
        return (await getProductByType({ type, category })).data;
    };
    return (await getAllProducts()).data;
};