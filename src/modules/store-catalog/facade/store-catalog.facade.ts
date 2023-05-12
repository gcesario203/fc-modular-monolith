import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import FindAllProductsUseCase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUseCase from "../usecase/find-product/find-product.usecase";
import StoreCatalogFacadeInterface, { FindAllStoreCatalogFacadeOuputDto, FindStoreCatalogFacadeInputDto, FindStoreCatalogFacadeOuputDto } from "./store-catalog.facade.interface";

export interface UseCasesProps {
    findUseCase: FindProductUseCase,
    findAllUseCase: FindAllProductsUseCase
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {

    private _findUseCase: FindProductUseCase;
    private _findAllUseCase: FindAllProductsUseCase;

    constructor(props: UseCasesProps) {
        this._findUseCase = props.findUseCase;
        this._findAllUseCase = props.findAllUseCase;
    }

    async find(id: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOuputDto> {
        return await this._findUseCase.execute(id);
    }
    async findAll(): Promise<FindAllStoreCatalogFacadeOuputDto> {
        return await this._findAllUseCase.execute();
    }

}