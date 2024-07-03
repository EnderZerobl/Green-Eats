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
    const response = axios(`http://localhost:3001/produtos/${id}`)
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
}: requisitionParams) {
    if (id) {
        return await getProductById(id.toString());
    };
    if ( type || category) {
        return await getProductByType({ type, category });
    };
    return await getAllProducts();
};