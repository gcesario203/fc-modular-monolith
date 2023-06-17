export interface AddClientFacadeInputDto {
    id?: string;
    name: string;
    email: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
    document: string;
}

export interface AddClientFacadeOutputDto {
    id: string;
    name: string;
    email: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
    createdAt: Date;
    updatedAt: Date;
    document: string;
}

export interface FindClientFacadeInputDto {
    id: string
}

export interface FindClientFacadeOutputDto {
    id: string;
    name: string;
    email: string;
    street: string;
    number: string;
    complement: string;
    document: string;
    city: string;
    state: string;
    zipCode: string;
    createdAt: Date;
    updatedAt: Date;
}

export default interface ClientAdmFacadeInterface {
    add(input: AddClientFacadeInputDto): Promise<AddClientFacadeOutputDto>;
    find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto>;
}