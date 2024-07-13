export type ResponseFromApi = {
    id: number;
    nome: string;
    categoria: string;
    tipo: string;
    imagemPath: string | File;
    descricaoId: number;
    desc?: string;
    armazenId: number;
    armazen?: string;
    vegano: boolean;
    sustentavel: boolean;
    semGluten: boolean;
    semLactose: boolean;
    organico: boolean;
    semAcucar: boolean;
    producaoArtesanal: boolean;
    proximoAoVencimento: boolean;
    seloIBD: boolean;
    agroFlorestal: boolean;
    artesanal: boolean;
    semAdicaoDeAcucar: boolean;
    promocao: boolean;
    exclusivo: boolean;
    estoque: number;
    preco: number;
    desconto: number;
    precoNovo: number;
};

export type FullParamsToCreate = {
    nome: string;
    categoria: string;
    tipo: string;
    imagemPath: File;
    descricaoContent: string;
    armazenContent: string;
    vegano: boolean;
    sustentavel: boolean;
    semGluten: boolean;
    semLactose: boolean;
    organico: boolean;
    semAcucar: boolean;
    producaoArtesanal: boolean;
    proximoAoVencimento: boolean;
    seloIBD: boolean;
    agroflorestal: boolean;
    artesanal: boolean;
    semAdicaoDeAcucar: boolean;
    promocao: boolean;
    estoque: number;
    preco: number;
    desconto: number;
};

export type PartialParamsToCreate = {
    nome: string;
    categoria: string;
    tipo: string;
    imagemPath: File;
    descricaoContent: string;
    armazenContent: string;
    vegano?: boolean;
    sustentavel?: boolean;
    semGluten?: boolean;
    semLactose?: boolean;
    organico?: boolean;
    semAcucar?: boolean;
    producaoArtesanal?: boolean;
    proximoAoVencimento?: boolean;
    seloIBD?: boolean;
    agroflorestal?: boolean;
    artesanal?: boolean;
    semAdicaoDeAcucar?: boolean;
    promocao: boolean;
    estoque: number;
    preco: number;
    desconto: number;
};

export type RequisitionParams = {
    name?: string;
    type?: string;
    category?: string;
    characteristics?: string;
    id?: number;
};

<<<<<<< HEAD
=======
export type UsableCart = {
    id: number;
    quantidade: number;
    produtoId: number;
    produto: ResponseFromApi;
}

>>>>>>> 3413db83bc5bf59ca1b7335ff31c330c012724d4
export type HigherData = {
    "Green Horta": ResponseFromApi[];
    "Green Mercearia": ResponseFromApi[];
    "Bebidas e Laticinios": ResponseFromApi[];
    "Ovos e Carnes": ResponseFromApi[];
}