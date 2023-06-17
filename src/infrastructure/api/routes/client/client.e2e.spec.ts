import { app, sequelize } from '../../express';

import request from 'supertest'


describe('End-to-end tests for products', () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true })
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it("should create a product", async () => {
        const createClientInput = {
            id: "1c",
            name: "Mauricio de Sousa",
            email: "xxx@xxx.com",
            street: "aaa",
            number: "b",
            complement: "xxxx",
            city: "Americana",
            state: "Sp",
            zipCode: "1111",
            document: "asjkbasbjkas",
        }

        const output = await request(app).post('/clients')
                                         .send(createClientInput);

        expect(output.status).toBe(200);

        expect(output.body.id).toBe(createClientInput.id)
        expect(output.body.city).toBe(createClientInput.city)
        expect(output.body.complement).toBe(createClientInput.complement)
        expect(output.body.name).toBe(createClientInput.name)
        expect(output.body.document).toBe(createClientInput.document)
        expect(output.body.state).toBe(createClientInput.state)
        expect(output.body.street).toBe(createClientInput.street)
        expect(output.body.zipCode).toBe(createClientInput.zipCode)
        expect(output.body.number).toBe(createClientInput.number)
    })
})