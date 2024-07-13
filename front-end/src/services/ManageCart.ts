import axios from "axios"


const addToCart = async (produtoId: number, quantidade: number) => {
    const response = await axios.post("http://localhost:3001/carrinho", {produtoId, quantidade});

    return response.data
}

const getCart = async ()=>{
    const response = await axios(`http://localhost:3001/carrinho`);

    return response.data
}

const getTotal = async ()=>{
    const response = await axios(`http://localhost:3001/carrinho/total`);

    return response.data.total
}

const editCart = async (id: number, quantidade: number)=>{
    const response = await axios.put(`http://localhost:3001/carrinho/${id}`, {quantidade});

    return response.data
}

const deleteCart = async (id: number) => {
    const response = await axios.delete(`http://localhost:3001/carrinho/${id}`);

    return response.data;
}

export async function fetchCart (type: "get" | "put" | "post" | "delete" | "total",
    data?: {
        id: number;
        quantidade: number;
    }
) {
    if (type === "total") return await getTotal();

    if (type === "get") return await getCart();

    //@ts-ignore
    if (type === "post") return await addToCart(data.id, data.quantidade);

    //@ts-ignore
    if (type === "put") return await editCart(data.id, data.quantidade);

    //@ts-ignore
    return await deleteCart(data.id)
}