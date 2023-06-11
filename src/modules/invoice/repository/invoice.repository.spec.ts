import { Sequelize } from "sequelize-typescript";
import { InvoiceModel } from "./model/invoice.model";
import { InvoiceProductModel } from "./model/invoice.product.model";
import InvoiceRepository from "./invoice.repository";
import Invoice from "../domain/entity/invoice.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../domain/value-object/address.value-object";
import Product from "../domain/entity/invoice-product.entity";

describe('Invoice repository test', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })


        await sequelize.addModels([InvoiceModel, InvoiceProductModel]);

        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    })

    it("should find a invoice", async () => {
        const invoiceToCreate = {
            id: "invoice-1",
            name: "Nota fiscal",
            document: "sdbjksdbjksdbjk",
            street: "Rua dos bobos",
            number: "234",
            complement: "",
            city: "Americana",
            state: "SP",
            zipCode: "1212",
            createdAt: new Date(),
            updatedAt: new Date(),
            items: [
                {
                    id: "invoice-product-1",
                    name: "Camiseta do vasco",
                    price: 50,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: "invoice-product-2",
                    name: "Camiseta do Paysandu",
                    price: 1500,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            ],
            total: 1550
        }

        await InvoiceModel.create(invoiceToCreate, { include: [{ model: InvoiceProductModel }] })

        const repository = new InvoiceRepository();

        const output = await repository.find("invoice-1");

        expect(output.id.id).toEqual(invoiceToCreate.id)
        expect(output.name).toEqual(invoiceToCreate.name)
        expect(output.document).toEqual(invoiceToCreate.document)

        // VALIDAÇÃO DE ENDEREÇO
        expect(output.address.city).toEqual(invoiceToCreate.city)
        expect(output.address.complement).toEqual(invoiceToCreate.complement)
        expect(output.address.number).toEqual(invoiceToCreate.number)
        expect(output.address.state).toEqual(invoiceToCreate.state)
        expect(output.address.street).toEqual(invoiceToCreate.street)
        expect(output.address.zipCode).toEqual(invoiceToCreate.zipCode)

        // VALIDAÇÃO DE PRODUTOS
        expect(output.items.map(item => ({
            id: item.id.id,
            name: item.name,
            price: item.price,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        }))).toMatchObject(invoiceToCreate.items)
        expect(output.total).toBe(invoiceToCreate.total)
    })

    it("should create a invoice", async () => {
        const repository = new InvoiceRepository();

        const invoiceToCreate = new Invoice({
            id: new Id("invoice-1"),
            name: "Nota fiscal",
            address: new Address({
                city: "Americana",
                state: "SP",
                number: "14566",
                complement: "",
                street: "Rua dos bobos",
                zipCode: "67895-974"
            }),
            document: "34757653498",
            items: [
                new Product({
                    id: new Id("product-1"),
                    name: "Camiseta do flamengo",
                    price: 300
                })
            ]
        })

        await repository.generate(invoiceToCreate);

        const createdInvoice = await InvoiceModel.findOne({ where: { id: invoiceToCreate.id.id }, include: [{ model: InvoiceProductModel }] })

        expect(invoiceToCreate.id.id).toEqual(createdInvoice.id)
        expect(invoiceToCreate.name).toEqual(createdInvoice.name)
        expect(invoiceToCreate.document).toEqual(createdInvoice.document)

        // VALIDAÇÃO DE ENDEREÇO
        expect(invoiceToCreate.address.city).toEqual(createdInvoice.city)
        expect(invoiceToCreate.address.complement).toEqual(createdInvoice.complement)
        expect(invoiceToCreate.address.number).toEqual(createdInvoice.number)
        expect(invoiceToCreate.address.state).toEqual(createdInvoice.state)
        expect(invoiceToCreate.address.street).toEqual(createdInvoice.street)
        expect(invoiceToCreate.address.zipCode).toEqual(createdInvoice.zipCode)

        // VALIDAÇÃO DE PRODUTOS
        expect(invoiceToCreate.items.map(item => ({
            id: item.id.id,
            name: item.name,
            price: item.price,
            invoiceId: invoiceToCreate.id.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        }))).toMatchObject(createdInvoice.items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            invoiceId: invoiceToCreate.id.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        })))
    })

}
)