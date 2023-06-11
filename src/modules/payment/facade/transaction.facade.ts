import UseCaseInterface from "../../@shared/usecase/usecase.interface"
import TransactionFacadeInterface, { ProcessPaymentFacadeInputDto, ProcessPaymentFacadeOutputDto } from "./transaction.facade.interface"


type TransactionFacadePropos = {
    processUseCase: UseCaseInterface
}

export default class TransactionFacade implements TransactionFacadeInterface
{
    private _processUseCase : UseCaseInterface;


    constructor(props: TransactionFacadePropos) {
        this._processUseCase = props.processUseCase;
    }

    async process(input: ProcessPaymentFacadeInputDto): Promise<ProcessPaymentFacadeOutputDto> {
        return await this._processUseCase.execute(input) ;
    }
}