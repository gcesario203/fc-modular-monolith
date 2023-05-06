import AddProductUseCase from "./add-product.usecase";

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn()
    }
}

describe('Add product use case unit test', () => {

    it('should add a product', async () => {

        const productRepository = MockRepository();

        const useCase = new AddProductUseCase(productRepository);

        const input = {
            name: 'Produto 1',
            description: 'Descrição do produto 1',
            purchasePrice: 30.00,
            stock: 10
        }

        const result  = await useCase.execute(input);

        expect(productRepository.add).toHaveBeenCalled();

        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.description).toBe(input.description);
        expect(result.stock).toBe(input.stock);
        expect(result.purchasePrice).toBe(input.purchasePrice);
    })
})