import UseCaseInterface from "../../../../@shared/usecase/usecase.interface";
import InvoiceGateway from "../../../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from "./find-invoice.usecase.dto";


export default class FindInvoiceUseCase implements UseCaseInterface {
    private _gateway : InvoiceGateway;

    constructor(gateway: InvoiceGateway) {
        this._gateway = gateway;
    }

    async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
        const invoice = await this._gateway.find(input.id);

        if(!invoice) throw new Error("Invoice not found");

        return {
            id: invoice.id.id,
            address: invoice.address,
            createdAt: invoice.createdAt,
            document: invoice.document,
            name: invoice.name,
            total: invoice.total,
            items: invoice.items.map(item => ({
                id: item.id.id,
                name: item.name,
                price: item.price
            }))
        }
    }
}