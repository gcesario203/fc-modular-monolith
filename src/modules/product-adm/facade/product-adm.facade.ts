import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import ProductAdmFacadeInterface, { AddProductFacadeInputDto, AddProductFacadeOutputDto, CheckStockFacadeInputDto, CheckStockFacadeOutputDto } from "./product-adm.facade.interface";


export interface UseCasesProps {
    addUseCase: UseCaseInterface,
    checkStockUseCase: UseCaseInterface
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {

    private _addUseCase: UseCaseInterface;

    private _checkStockUseCase: UseCaseInterface;

    constructor(props: UseCasesProps) {
        this._addUseCase = props.addUseCase;

        this._checkStockUseCase = props.checkStockUseCase;
    }

    addProduct(input: AddProductFacadeInputDto): Promise<AddProductFacadeOutputDto> {
        return this._addUseCase.execute(input);
    }
    checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
        return this._checkStockUseCase.execute(input);
    }

}