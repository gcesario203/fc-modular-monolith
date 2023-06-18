import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/entity/product.entity";
import ProductGateway from "../gateway/product.gateway";
import { ProductAdmModel as ProductModel } from "./product.model";

export default class ProductRepository implements ProductGateway {

    async add(product: Product): Promise<Product> {
        await ProductModel.create({
            id: product.id.id,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        })

        return product;
    }
    async find(id: string): Promise<Product> {
        const productFromDb = await ProductModel.findOne({ where: { id: id } });

        if(!productFromDb)
            throw new Error(`Product with id ${id} not found!`)

        const productProps = {
            id: new Id(productFromDb.id),
            name: productFromDb.name,
            description: productFromDb.description,
            purchasePrice: productFromDb.purchasePrice,
            stock: productFromDb.stock,
            createdAt: productFromDb.createdAt,
            updatedAt: productFromDb.updatedAt,
        };

        return new Product(productProps);
    }

}