import { Sequelize } from "sequelize-typescript"
import { ProductModel } from "./product.model";
import Product from "../domain/entity/product.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import ProductRepository from "./product.repository";

describe('Product repository test', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })


        await sequelize.addModels([ProductModel]);

        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    })

    it('Should create a product', async () => {
        const productRepository = new ProductRepository();

        const productProps = {
            id: new Id("1"),
            name: "aaaaa",
            description: "bbbbb",
            purchasePrice: 2,
            stock: 10
        }

        const product = new Product(productProps);

        await productRepository.add(product);

        const productDB = await ProductModel.findOne({ where: { id: productProps.id.id } });

        expect(productProps.id.id).toBe(productDB.id);
        expect(productProps.name).toBe(productDB.name);
        expect(productProps.description).toBe(productDB.description);
        expect(productProps.purchasePrice).toBe(productDB.purchasePrice);
        expect(productProps.stock).toBe(productDB.stock);
    })

    it('should get a product', async () => {
        const productRepository = new ProductRepository();

        const productProps = {
            id: new Id("1"),
            name: "aaaaa",
            description: "bbbbb",
            purchasePrice: 2,
            stock: 10
        }

        const product = new Product(productProps);

        await productRepository.add(product);

        const result = await productRepository.find(productProps.id.id);

        expect(productProps.id.id).toBe(result.id.id);
        expect(productProps.name).toBe(result.name);
        expect(productProps.description).toBe(result.description);
        expect(productProps.purchasePrice).toBe(result.purchasePrice);
        expect(productProps.stock).toBe(result.stock);
    })

})