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
        const createProductInput = {
            id: "1p",
            name: "Produto 1",
            description: "Testes e2e",
            purchasePrice: 300,
            stock: 10,
        }

        const output = await request(app).post('/products')
                                         .send(createProductInput);

        expect(output.status).toBe(200);
        expect(output.body.name).toBe(createProductInput.name);
        expect(output.body.description).toBe(createProductInput.description);
        expect(output.body.purchasePrice).toBe(createProductInput.purchasePrice);
        expect(output.body.stock).toBe(createProductInput.stock);
    })
})