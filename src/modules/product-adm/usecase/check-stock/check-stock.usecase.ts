import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import ProductGateway from "../../gateway/product.gateway";
import { CheckStockInputDto, CheckStockOuputDto } from "./check-stock.dto";

export default class CheckStockUseCase implements UseCaseInterface {
    private _productRepository: ProductGateway;

    constructor(productRepository: ProductGateway){
        this._productRepository = productRepository;
    }


    async execute(input: CheckStockInputDto): Promise<CheckStockOuputDto> {
        const productFromDb = await this._productRepository.find(input.productId);

        return {
            productId: productFromDb.id.id,
            stock: productFromDb.stock
        }
    }

}