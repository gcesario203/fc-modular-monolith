import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import Invoice from "../domain/entity/invoice.entity";
import InvoiceFacadeInterface, { FindInvoiceFacadeUseCaseInputDTO, FindInvoiceFacadeUseCaseOutputDTO, GenerateInvoiceFacadeUseCaseInputDto, GenerateInvoiceFacadeUseCaseOutputDto } from "./invoice.facade.interface";

type InvoiceFacadeProps = {
    findUseCase: UseCaseInterface
    generateUseCase: UseCaseInterface
}

export default class InvoiceFacade implements InvoiceFacadeInterface {

    private _findUseCase: UseCaseInterface
    private _generateUseCase: UseCaseInterface

    constructor(props: InvoiceFacadeProps) {
        this._findUseCase = props.findUseCase;

        this._generateUseCase = props.generateUseCase;
    }

    async find(input: FindInvoiceFacadeUseCaseInputDTO): Promise<FindInvoiceFacadeUseCaseOutputDTO> {
        return await this._findUseCase.execute(input);
    }
    async generate(input: GenerateInvoiceFacadeUseCaseInputDto): Promise<GenerateInvoiceFacadeUseCaseOutputDto> {
        return await this._generateUseCase.execute(input);
    }

}