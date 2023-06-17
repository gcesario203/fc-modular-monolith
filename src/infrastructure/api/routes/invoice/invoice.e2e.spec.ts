import { app, sequelize } from "../../express";
import request from "supertest";
import InvoiceFacadeFactory from "../../../../modules/invoice/factory/invoice.facade.factory";

describe("E2E test for invoice", () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true })
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it("should get a created invoice", async () => {

        const createInvoiceInput = {
            id: "i1",
            name: "Invoice 1",
            document: "1212312",
            street: "aaa",
            number: "bbb",
            complement: "ccc",
            city: "ddd",
            state: "eee",
            zipCode: "fff",
            items: [
                {
                    id: "1",
                    name: "product 1",
                    price: 100
                },
                {
                    id: "2",
                    name: "product 2",
                    price: 200
                }
            ]
        }
        
        await InvoiceFacadeFactory.create().generate(createInvoiceInput);

        const output = await request(app).get(`/invoice/${createInvoiceInput.id}`)

        expect(output.status).toBe(200);

        expect(output.body.id).toBe(createInvoiceInput.id)
        expect(output.body.items).toMatchObject(createInvoiceInput.items)
        expect(output.body.name).toBe(createInvoiceInput.name)
        expect(output.body.document).toBe(createInvoiceInput.document)


        expect(output.body.street).toBe(createInvoiceInput.street)
        expect(output.body.city).toBe(createInvoiceInput.city)
        expect(output.body.complement).toBe(createInvoiceInput.complement)
        expect(output.body.number).toBe(createInvoiceInput.number)
        expect(output.body.state).toBe(createInvoiceInput.state)
        expect(output.body.zipCode).toBe(createInvoiceInput.zipCode)
    });
});