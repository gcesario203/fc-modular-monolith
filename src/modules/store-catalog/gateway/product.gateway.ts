import Product from "../domain/procuct.entity";

export default interface ProductGateway {
    findAll(): Promise<Product[]>;
    find(id: string): Promise<Product>;
}