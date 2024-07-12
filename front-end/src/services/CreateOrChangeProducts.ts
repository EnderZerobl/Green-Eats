import { FullParamsToCreate, PartialParamsToCreate } from "@/lib/types";
import axios from "axios";

const createProduct = async (data: FormData) => {
    const response = await axios.post("http://localhost:3001/produtos", data);

    return response
}

const editProduct = async (id: number, data: FormData) => {
    const response = await axios.put(`http://localhost:3001/produtos/${id}`, data);

    return response;
}

export async function createNewProduct (params: FormData) {

    const response = createProduct(params)

    return response
};

export async function changeProduct (id: number, params: FormData) {

    const response = editProduct(id, params);

    return response
}