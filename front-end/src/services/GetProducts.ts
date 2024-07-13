import { RequisitionParams, ResponseFromApi } from '@/lib/types';
import axios from 'axios';
import { Buffer } from 'buffer';

const getAllProducts = async (): Promise<ResponseFromApi[]> => {
    const response = await axios("http://localhost:3001/banco");

    return response.data;
};

const getProductByName = async (name: string): Promise<ResponseFromApi[]> => {
    const response = await axios(`http://localhost:3001/produtos/nomes/${name}`);

    return response.data;
};

const getProductById = async (id: string): Promise<ResponseFromApi> => {
    const response = await axios(`http://localhost:3001/produtos/${id}`);

    return response.data;
};

const getProductByType = async ({ type, category, characteristics }: RequisitionParams): Promise<ResponseFromApi[]> => {
    const params = characteristics?
        `filtrados?${characteristics}=true`
        :type ?
        `tipos?tipos=${type}`
        : `categorias?categorias=${category}`;
    try {
        const response = await axios(`http://localhost:3001/produtos/busca/${params}`);
        return response.data;
    } catch (error: any) {
        return [];
    }
};

const getInfo = async ({ id }: {
    id: number;
}): Promise<{
    descricao: {
        content: string
    };
    armazen: {
        content: string
    }
}> => {
    const response = await axios(`http://localhost:3001/produtos/armazen/${id}`);

    return response.data;
};

const getImage = async (id: number): Promise<string> => {
    const response = await axios(`http://localhost:3001/produtos/${id}/imagem`, {
        responseType: 'arraybuffer',
    });
    const base64String = Buffer.from(response.data, 'binary').toString('base64');
    return `data:image/png;base64,${base64String}`;
};

export async function getProducts({
    name,
    type,
    category,
    characteristics,
    id,
}: RequisitionParams): Promise<ResponseFromApi[]> {

    if (name) {
        const response = await getProductByName(name);

        for (let product of response) {
            const image = await getImage(product.id);
            product.imagemPath = image;
        }

        return response;
    };

    if (id) {
        const response = await getProductById(id.toString());
        const info = await getInfo({ id });
        const image = await getImage(response.id);
        response.imagemPath = image;
        response.armazen = info.armazen.content;
        response.desc = info.descricao.content;
        return [response];
    };

    if (type || category || characteristics) {
        const response = await getProductByType({ type, category, characteristics });

        for (let product of response) {
            const info = await getInfo({ id: product.id });
            const image = await getImage(product.id);
            product.imagemPath = image;
            product.armazen = info.armazen.content;
            product.desc = info.descricao.content;
        }

        return response;
    };

    const response = await getAllProducts();

    for (let product of response) {
        const info = await getInfo({ id: product.id });
        const image = await getImage(product.id);
        product.imagemPath = image;
        product.armazen = info.armazen.content;
        product.desc = info.descricao.content;
    }

    return response;
};
