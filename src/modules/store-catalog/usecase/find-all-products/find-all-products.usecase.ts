import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import ProductGateway from "../../gateway/product.gateway";
import { FindAllProductsDto } from "./find-all-products.dto";

export default class FindAllProductsUseCase implements UseCaseInterface {
    private _productRepository: ProductGateway;

    constructor(productRepository: ProductGateway) {
        this._productRepository = productRepository;
    }
    async execute(): Promise<FindAllProductsDto> {
        const result = await this._productRepository.findAll();

        return {
            products: result.map(productFromDb => ({
                id: productFromDb.id.id,
                name: productFromDb.name,
                description: productFromDb.description,
                salesPrice: productFromDb.salePrice,
            }))
        };
    }
}