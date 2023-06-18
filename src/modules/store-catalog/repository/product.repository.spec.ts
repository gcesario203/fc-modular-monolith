import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.model";
import ProductRepository from "./product.repository";

describe("storage-catalog product repository unit tests", () => {
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

    it("should find all products", async () => {
        await ProductModel.create({
            id: "1",
            name: "product",
            description: "222",
            salesPrice: 10
        })
        await ProductModel.create({
            id: "2",
            name: "product 2",
            description: "333",
            salesPrice: 5
        })

        const productRepository = new ProductRepository();

        const result = await productRepository.findAll();

        expect(result.length).toBe(2)

        expect( result[0].id.id).toBe("1")
        expect( result[0].name).toBe("product")
        expect( result[0].description).toBe("222")
        expect( result[0].salesPrice).toBe(10)

        expect( result[1].id.id).toBe("2")
        expect( result[1].name).toBe("product 2")
        expect( result[1].description).toBe("333")
        expect( result[1].salesPrice).toBe(5)
    })
    it("should find a product", async () => {
        await ProductModel.create({
            id: "1",
            name: "product",
            description: "222",
            salesPrice: 10
        })

        const productRepository = new ProductRepository();

        const result = await productRepository.find("1");

        expect( result.id.id).toBe("1")
        expect( result.name).toBe("product")
        expect( result.description).toBe("222")
        expect( result.salesPrice).toBe(10)
    })
})