export interface AddClientInputDto {
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

export interface AddClientOutputDto {
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