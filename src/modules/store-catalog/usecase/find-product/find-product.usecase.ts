import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import ProductGateway from "../../gateway/product.gateway";
import { FindProductInputDto, FindProductOutputDto } from "./find-product.dto";

export default class FindProductUseCase implements UseCaseInterface {
    private _productRepository: ProductGateway;

    constructor(productRepository: ProductGateway) {
        this._productRepository = productRepository;
    }

    async execute(input: FindProductInputDto): Promise<FindProductOutputDto> {
        const result = await this._productRepository.find(input.id);

        return {
            id: result.id.id,
            description: result.description,
            name: result.name,
            salesPrice: result.salesPrice
        }
    }

}