import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/procuct.entity";
import FindAllProductsUseCase from "./find-all-products.usecase";


const product1 = new Product({
    id: new Id("1"),
    name: "product",
    description: "222",
    salesPrice: 10
})

const product2 = new Product({
    id: new Id("2"),
    name: "product 2",
    description: "333",
    salesPrice: 5
})

const products = [product1, product2]

const mockRepository = () => {
    return {
        findAll: jest.fn().mockReturnValue(Promise.resolve(products)),
        find: jest.fn()
    }
}

describe("Find all products unit tests", () => {
    it("should find all products", async () => {
        const productRepository = mockRepository();

        const findAllProductsUseCase = new FindAllProductsUseCase(productRepository);

        const result = await findAllProductsUseCase.execute();

        expect(productRepository.findAll).toHaveBeenCalled();

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
})