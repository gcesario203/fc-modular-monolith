import { Sequelize } from "sequelize-typescript";
import ProductModel from "../repository/product.model";
import StoreCatalogeFacadeFactory from "../factory/facade.factory";


describe("store-catalog facade unit tests", () => {
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

    it("should find all product", async () => {
        await ProductModel.create({
            id: "1",
            name: "product",
            description: "222",
            salePrice: 10
        })
        await ProductModel.create({
            id: "2",
            name: "product 2",
            description: "333",
            salePrice: 5
        })


        const facade = StoreCatalogeFacadeFactory.create();

        const result = await facade.findAll();

        expect(result.products.length).toBe(2)

        expect( result.products[0].id).toBe("1")
        expect( result.products[0].name).toBe("product")
        expect( result.products[0].description).toBe("222")
        expect( result.products[0].salesPrice).toBe(10)

        expect( result.products[1].id).toBe("2")
        expect( result.products[1].name).toBe("product 2")
        expect( result.products[1].description).toBe("333")
        expect( result.products[1].salesPrice).toBe(5)
    })

    it('should find a product', async () => {
        await ProductModel.create({
            id: "1",
            name: "product",
            description: "222",
            salePrice: 10
        })

        const input = {
            id: "1"
        }

        const facade = StoreCatalogeFacadeFactory.create();

        const result = await facade.find(input);

        expect( result.id).toBe("1")
        expect( result.name).toBe("product")
        expect( result.description).toBe("222")
        expect( result.salesPrice).toBe(10)
    })
})