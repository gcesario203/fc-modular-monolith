import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import Product from "../../domain/entity/product.entity";
import ProductGateway from "../../gateway/product.gateway";
import { AddProductInputDto, AddProductOutputDto } from "./add-product.dto";

export default class AddProductUseCase implements UseCaseInterface {

    private _productRepository: ProductGateway;

    constructor(productRepository: ProductGateway){
        this._productRepository = productRepository;
    }

    async execute(input: AddProductInputDto) : Promise<AddProductOutputDto> {
        const props = {
            id: new Id(input.id),
            name: input.name,
            description: input.description,
            purchasePrice: input.purchasePrice,
            stock: input.stock
        }

        const product = new Product(props);

        this._productRepository.add(product);

        return {
            id: product.id.id,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
            stock: product.stock
        }
    }
}