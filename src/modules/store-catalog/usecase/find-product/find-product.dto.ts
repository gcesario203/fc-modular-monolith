export interface FindProductOutputDto {
    id: string,
    name: string,
    description: string,
    salesPrice: number
}

export interface FindProductInputDto {
    id: string
}