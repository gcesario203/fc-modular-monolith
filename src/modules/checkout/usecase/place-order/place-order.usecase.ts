import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import ClientAdmFacadeInterface from "../../../client-adm/facade/client-adm.facade.interface";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.usecase.dto";


type PlaceOrderUseCaseProps = {
    clientFacade: ClientAdmFacadeInterface
}

export default class PlaceOrderUseCase implements UseCaseInterface {

    private _clientFacade: ClientAdmFacadeInterface

    constructor(props: PlaceOrderUseCaseProps) {
        this._clientFacade = (props || {}).clientFacade || null
    }


    async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {

        const client = await this._clientFacade.find({ id: input.clientId});

        if(!client) throw new Error("Client not found");

        return {
            id: "",
            invoiceId: "",
            products: [],
            status: "",
            total: 0
        }
    }

}