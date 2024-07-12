import { RequisitionParams, ResponseFromApi } from '@/lib/types';
import axios from 'axios';



const getAllProducts = async (): Promise<ResponseFromApi[]> => {
    const response = await axios("http://localhost:3001/banco")

    return response.data;
};

const getProductByName = async (name: string): Promise<ResponseFromApi[]> => {
    const response = await axios(`http://localhost:3001/produtos/nomes/${name}`);

    return response.data
}

const getProductById = async (id: string): Promise<ResponseFromApi> => {
    const response = await axios(`http://localhost:3001/produtos/${id}`);

    return response.data;
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

const getInfo = async ({ id }:{
    id: number;
}): Promise<{
    descricao:{
        content: string
    };
    armazen: {
        content: string
    }
}> => {
    const response = await axios(`http://localhost:3001/produtos/armazen/${id}`)

    return response.data
}

const getImage = async (imageName: File) => {
    const response = await axios(`http://localhost:3001/produtos/imagem/${imageName}`);

    return new File([response.data.imagemPath], "imagem")
}

export async function getProducts ({
    name,
    type,
    category,
    id,
}: RequisitionParams): Promise<ResponseFromApi[]> {
    if (name){
        const response = await getProductByName(name)

        response.forEach(async product=>{
            //@ts-ignore
            const imagemName = product.imagemPath.match(/\/(.*)/)
        if(imagemName){
            const image = await getImage(imagemName[1])
            product.imagemPath=image
        }
        })

        return response
    };
    if (id) {
        const response = await getProductById(id.toString())
        const info = await getInfo({ id })
        //@ts-ignore
        const imagemName = response.imagemPath.match(/\/(.*)/)
        if(imagemName){
            const image = await getImage(imagemName[1])
            response.imagemPath=image
        }
        response.armazen = info.armazen.content
        response.desc = info.descricao.content
        return [response];
    };
    if ( type || category) {
        const response = (await getProductByType({ type, category }))

        response.forEach(async product=>{
            //@ts-ignore
            const imagemName = product.imagemPath.match(/\\(.*)/)
            product.imagemPath = JSON.stringify(imagemName)
        if(imagemName){
            const image = await getImage(imagemName[1])
            product.imagemPath=image
        }
        })
        
        return response;
    };
    const response = await getAllProducts();
    
    response.forEach(async product=>{
        //@ts-ignore
        const imagemName = product.imagemPath.match(/\\(.*)/)
       
    if(imagemName[1]){
        const image = await getImage(imagemName[1])
        product.imagemPath=image
        console.log(product.imagemPath)
    }
    })
    console.log(response[0].imagemPath)
    return  response;
};