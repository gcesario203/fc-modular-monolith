export interface FindStoreCatalogFacadeInputDto {
    id: string;
}

export interface FindStoreCatalogFacadeOuputDto {
    id: string;
    name: string;
    description: string;
    salePrice: number;
}

export interface FindAllStoreCatalogFacadeOuputDto {
    products: {
        id: string;
        name: string;
        description: string;
        salePrice: number;
    }[]
}


export default interface StoreCatalogFacadeInterface {
    find(id: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOuputDto>;
    findAll(): Promise<FindAllStoreCatalogFacadeOuputDto>;
}