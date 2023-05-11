import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../repository/product.model";
import ProductAdmFacadeFactory from "../factory/facade.factory";


describe('Product adm facade test', () => {
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


    it('should create a product', async () => {
        const productFacade = ProductAdmFacadeFactory.create();

        const input = {
            id: "1",
            name: "Produto 1",
            purchasePrice: 10,
            stock: 2,
            description: "Produto 1 descrição"
        }

        await productFacade.addProduct(input);

        const productDB = await ProductModel.findOne({ where: { id: input.id } });

        expect(input.id).toBe(productDB.id);
        expect(input.name).toBe(productDB.name);
        expect(input.description).toBe(productDB.description);
        expect(input.purchasePrice).toBe(productDB.purchasePrice);
        expect(input.stock).toBe(productDB.stock);
    })

    it('should check product stock', async () => {
        const productFacade = ProductAdmFacadeFactory.create();

        const input = {
            id: "1",
            name: "Produto 1",
            purchasePrice: 10,
            stock: 2,
            description: "Produto 1 descrição"
        }

        await productFacade.addProduct(input);

        const result = await productFacade.checkStock({ productId: input.id });

        expect(result.productId).toBe(input.id);

        expect(result.stock).toBe(input.stock);
    })
})