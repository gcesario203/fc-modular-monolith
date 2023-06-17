import { Sequelize } from "sequelize-typescript";
import { InvoiceModel } from "../repository/model/invoice.model";
import { InvoiceProductModel } from "../repository/model/invoice.product.model";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";

describe('Invoice facade test', () => {
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

    it("should generate a invoice", async () => {
        const facade = InvoiceFacadeFactory.create();

        const input = {
            id: "invoice-1",
            name: "Nota fiscal",
            city: "Americana",
            state: "SP",
            number: "14566",
            complement: "",
            street: "Rua dos bobos",
            zipCode: "67895-974",
            document: "34757653498",
            items: [
                {
                    id: "product-1",
                    name: "Camiseta do flamengo",
                    price: 300
                }
            ]
        }

        const output = await facade.generate(input);


        expect(input.id).toEqual(output.id)
        expect(input.name).toEqual(output.name)
        expect(input.document).toEqual(output.document)
        expect(input.items).toMatchObject(output.items)
        expect(output.total).toEqual(300)

        expect(input.city).toEqual(output.city)
        expect(input.zipCode).toEqual(output.zipCode)
        expect(input.state).toEqual(output.state)
        expect(input.street).toEqual(output.street)
        expect(input.number).toEqual(output.number)
        expect(input.complement).toEqual(output.complement)

    })

    it("should find a invoice", async () => {
        const facade = InvoiceFacadeFactory.create();

        const createInput = {
            id: "invoice-1",
            name: "Nota fiscal",
            city: "Americana",
            state: "SP",
            number: "14566",
            complement: "",
            street: "Rua dos bobos",
            zipCode: "67895-974",
            document: "34757653498",
            items: [
                {
                    id: "product-1",
                    name: "Camiseta do flamengo",
                    price: 300
                }
            ]
        }

        await facade.generate(createInput);

        const input = {
            id: "invoice-1"
        }

        const output = await facade.find(input);

        expect(createInput.id).toEqual(output.id)
        expect(createInput.name).toEqual(output.name)
        expect(createInput.document).toEqual(output.document)
        expect(createInput.items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price
        }))).toMatchObject(output.items)
        expect(output.total).toEqual(300)

        expect(output.city).toEqual(createInput.city)
        expect(output.zipCode).toEqual(createInput.zipCode)
        expect(output.state).toEqual(createInput.state)
        expect(output.street).toEqual(createInput.street)
        expect(output.number).toEqual(createInput.number)
        expect(output.complement).toEqual(createInput.complement)
    })

}
)