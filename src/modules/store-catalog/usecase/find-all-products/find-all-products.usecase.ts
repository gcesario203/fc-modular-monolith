import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import ProductGateway from "../../gateway/product.gateway";
import { FindAllProductsDto } from "./find-all-products.dto";

export default class FindAllProductsUseCase implements UseCaseInterface {
    private _findAllUseCase: ProductGateway;

    constructor(findAllUseCase: ProductGateway) {
        this._findAllUseCase = findAllUseCase;
    }
    async execute(): Promise<FindAllProductsDto> {
        const result = await this._findAllUseCase.findAll();

        return {
            products: result.map(productFromDb => ({
                id: productFromDb.id.id,
                name: productFromDb.name,
                description: productFromDb.description,
                salePrice: productFromDb.salePrice,
            }))
        };
    }
}