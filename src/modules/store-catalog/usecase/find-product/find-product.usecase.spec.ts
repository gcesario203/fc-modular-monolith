import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/procuct.entity";
import FindProductUseCase from "./find-product.usecase";


const product = new Product({
    id: new Id("1"),
    name: "product",
    description: "222",
    salePrice: 10
})

const mockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn()
    }
}

describe("storage-catalog find product unit test", () => {
    it("should get a product by id", async () => {

        const productRepository = mockRepository();

        const findProductUseCase = new FindProductUseCase(productRepository);

        const input = {
            id: "1"
        }

        const result = await findProductUseCase.execute(input);

        expect(productRepository.find).toHaveBeenCalled();

        expect( result.id).toBe("1")
        expect( result.name).toBe("product")
        expect( result.description).toBe("222")
        expect( result.salePrice).toBe(10)
    })
})