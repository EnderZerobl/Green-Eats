export type ResponseFromApi = {
    id: number;
    nome: string;
    categoria: string;
    tipo: string;
    imagemPath: string;
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
    preco: number;
    desconto: number;
};

export type RequisitionParams = {
    name?: string;
    type?: string;
    category?: string;
    id?: number;
};