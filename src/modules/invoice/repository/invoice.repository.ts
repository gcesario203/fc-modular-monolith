import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/entity/invoice-product.entity";
import Invoice from "../domain/entity/invoice.entity";
import Address from "../domain/value-object/address.value-object";
import InvoiceGateway from "../gateway/invoice.gateway";
import {InvoiceModel} from "./model/invoice.model";
import {InvoiceProductModel} from "./model/invoice.product.model";




export default class InvoiceRepository implements InvoiceGateway {
    async find(id: string): Promise<Invoice> {
        const foundInvoice = await InvoiceModel.findOne({
            where: { id }, include: [{
                model: InvoiceProductModel
            }]
        })

        return new Invoice({
            id: new Id(foundInvoice.id),
            name: foundInvoice.name,
            document: foundInvoice.document,
            createdAt: foundInvoice.createdAt,
            updatedAt: foundInvoice.updatedAt,
            address: new Address({
                city: foundInvoice.city,
                complement: foundInvoice.complement,
                number: foundInvoice.number,
                state: foundInvoice.state,
                street: foundInvoice.street,
                zipCode: foundInvoice.zipCode
            }),
            items: foundInvoice.items.map(item => (new Product({
                id: new Id(item.id),
                name: item.name,
                price: item.price,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt
            })))
            
        })
    }
    async generate(input: Invoice): Promise<Invoice> {
        await InvoiceModel.create({
            id: input.id.id,
            name: input.name,
            document: input.document,
            street: input.address.street,
            number: input.address.number,
            complement: input.address.complement,
            city: input.address.city,
            state: input.address.state,
            zipCode: input.address.zipCode,
            createdAt: input.createdAt,
            updatedAt: input.updatedAt,
            items: input.items.map((item) => ({
                id: item.id.id,
                name: item.name,
                price: item.price,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt
            })),
            total: input.total
        }, {
            include: [{ model: InvoiceProductModel}]
        });

        return input;
    }

}