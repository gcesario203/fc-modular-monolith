import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/entity/product.entity";
import CheckStockUseCase from "./check-stock.usecase";

const product = new Product({
    id: new Id("1"),
    name: "Prodduct",
    description: "Product desc",
    purchasePrice: 100,
    stock: 10
})

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product))
    }
}

describe('check stock of a product usecase unit test', () => {

    it('should get stock of a product', async () => {
        const ProductRepository = MockRepository();

        const checkStockUseCase = new CheckStockUseCase(ProductRepository);

        const input = {
            productId: "1"
        }

        const result = await checkStockUseCase.execute(input);

        expect(ProductRepository.find).toHaveBeenCalled();

        expect(result.stock).toBe(product.stock)

        expect(result.productId).toBe(input.productId)
    })
})