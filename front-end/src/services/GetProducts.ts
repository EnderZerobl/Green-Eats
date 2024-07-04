import { ResponseFromApi } from '@/lib/types';
import axios from 'axios';

type requisitionParams = {
    type?: string;
    category?: string;
    id?: number;
};

const getAllProducts = async (): Promise<ResponseFromApi[]> => {
    const response = await axios("http://localhost:3001/banco")

    return response.data;
};

const getProductById = async (id: string): Promise<ResponseFromApi[]> => {
    const response = await axios(`http://localhost:3001/produtos/${id}`);

    return [response.data];
}

const getProductByType = async ({ type, category }: requisitionParams): Promise<ResponseFromApi[]>  => {
    const params = type?
    `tipo/${type}`
    :`categorias/${category}`;

    const response = await axios(`http://localhost:3001/produtos/${params}`);

    return response.data;
};

export async function getProducts ({
    type,
    category,
    id,
}: requisitionParams): Promise<ResponseFromApi[]> {
    if (id) {
        return (await getProductById(id.toString()));
    };
    if ( type || category) {
        return (await getProductByType({ type, category }));
    };
    return (await getAllProducts());
};