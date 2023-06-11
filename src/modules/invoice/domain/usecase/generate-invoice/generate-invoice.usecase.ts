import Id from "../../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../../@shared/usecase/usecase.interface";
import InvoiceGateway from "../../../gateway/invoice.gateway";
import Product from "../../entity/invoice-product.entity";
import Invoice from "../../entity/invoice.entity";
import Address from "../../value-object/address.value-object";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.usecase.dto";


export default class GenerateInvoiceUseCase implements UseCaseInterface {
    private _gateway : InvoiceGateway;

    constructor(gateway: InvoiceGateway) {
        this._gateway = gateway;
    }

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        const invoiceToGenerate = new Invoice({
            id: new Id(input.id) || new Id(),
            address: new Address({
                city: input.city,
                complement: input.complement,
                number: input.number,
                state: input.state,
                street: input.street,
                zipCode: input.zipCode
            }),
            document: input.document,
            name: input.name,
            items: input.items.map(item => (new Product({
                id: new Id(item.id) || new Id(),
                name: item.name,
                price: item.price
            })))
        })

        const generatedInvoice = await this._gateway.generate(invoiceToGenerate);

        return {
            city: generatedInvoice.address.city,
            complement: generatedInvoice.address.complement,
            document: generatedInvoice.document,
            id: generatedInvoice.id.id,
            name: generatedInvoice.name,
            number: generatedInvoice.address.number,
            state: generatedInvoice.address.state,
            street: generatedInvoice.address.street,
            total: generatedInvoice.total,
            zipCode: generatedInvoice.address.zipCode,
            items: generatedInvoice.items.map(item => ({
                id: item.id.id,
                name: item.name,
                price: item.price
            }))
        };
    }

}