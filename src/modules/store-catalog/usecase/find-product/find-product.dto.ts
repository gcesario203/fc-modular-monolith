export interface FindProductOutputDto {
    id: string,
    name: string,
    description: string,
    salePrice: number
}

export interface FindProductInputDto {
    id: string
}