import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/procuct.entity";
import ProductGateway from "../gateway/product.gateway";
import ProductModel from "./product.model";

export default class ProductRepository implements ProductGateway {
    async findAll(): Promise<Product[]> {
        const productsFromDb = await ProductModel.findAll();

        return productsFromDb.map(productFromDb => new Product({
            id: new Id(productFromDb.id),
            name: productFromDb.name,
            description: productFromDb.description,
            salesPrice: productFromDb.salesPrice
        }))
    }

    async find(id: string): Promise<Product> {
        const productFromDb = await ProductModel.findOne({ where: { id: id } });

        if (!productFromDb)
            throw new Error(`Product with id ${id} not found!`);

        return new Product({
            id: new Id(productFromDb.id),
            name: productFromDb.name,
            description: productFromDb.description,
            salesPrice: productFromDb.salesPrice
        });
    }

}