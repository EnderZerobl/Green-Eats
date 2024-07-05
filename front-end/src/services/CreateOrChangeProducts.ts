import { FullParamsToCreate, PartialParamsToCreate } from "@/lib/types";
import axios from "axios";

const createProduct = async (data: FullParamsToCreate) => {
    const response = await axios("http://localhost:3001/produtos", {
        method: "post",
        data
    });

    return response
}

export async function createNewProduct (params: PartialParamsToCreate) {
    const response = await createProduct({
        nome: params.nome,
        categoria: params.categoria,
        tipo: params.tipo,
        imagemPath: params.imagemPath,
        descricaoContent: params.descricaoContent,
        armazenContent: params.armazenContent,
        vegano: Boolean(params.vegano), 
        sustentavel: Boolean(params.sustentavel), 
        semGluten: Boolean(params.semGluten), 
        semLactose: Boolean(params.semLactose), 
        organico: Boolean(params.organico), 
        semAcucar: Boolean(params.semAcucar),
        producaoArtesanal: Boolean(params.producaoArtesanal), 
        proximoAoVencimento: Boolean(params.proximoAoVencimento), 
        seloIBD: Boolean(params.seloIBD), 
        agroflorestal: Boolean(params.agroflorestal), 
        artesanal: Boolean(params.artesanal), 
        semAdicaoDeAcucar: Boolean(params.semAdicaoDeAcucar),
        preco: params.preco, 
        desconto: params.desconto
    })
    
    return response
};