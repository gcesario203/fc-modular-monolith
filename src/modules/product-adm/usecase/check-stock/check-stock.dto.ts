export interface CheckStockInputDto {
    productId: string;
}

export interface CheckStockOuputDto {
    productId: string;
    stock: number;
}