
import { app } from "../../express";
import { Sequelize } from "sequelize-typescript";
import request from "supertest";

import { ClientModel as ClientModelAdm } from "../../../../modules/client-adm/repository/client.model";

// Invoice
import { InvoiceModel } from "../../../../modules/invoice/repository/model/invoice.model";
import { InvoiceProductModel } from "../../../../modules/invoice/repository/model/invoice.product.model";

// Payment
import TransactionModel from "../../../../modules/payment/repository/transaction.model";

// ProductAdm
import { ProductAdmModel } from "../../../../modules/product-adm/repository/product.model";

// ProductCatalog
import StoreProductModel from "../../../../modules/store-catalog/repository/product.model";

// Checkout
import OrderModel from "../../../../modules/checkout/repository/model/order.model";
import { OrderClientModel } from "../../../../modules/checkout/repository/model/client.model";
import { OrderProductModel } from "../../../../modules/checkout/repository/model/product.model";

describe("E2E test for checkout", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([
            OrderModel,
            ClientModelAdm,
            OrderClientModel,
            StoreProductModel,
            InvoiceModel,
            InvoiceProductModel,
            OrderProductModel,
            TransactionModel,
            ProductAdmModel,
        ]);

        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a placeorder", async () => {
        const productProps = {
            id: "1",
            name: "test",
            description: "test",
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        await ClientModelAdm.create({
            id: "1",
            name: "test",
            email: "test@test.com",
            document: "test",
            street: "16 avenue",
            number: "123",
            complement: "Ap 400",
            city: "My city",
            state: "State",
            zipCode: "89777310",
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        await ProductAdmModel.create({
            ...productProps,
            purchasePrice: 50,
            stock: 1,
        })

        await StoreProductModel.create({
            ...productProps,
            salesPrice: 100
        })

        const response = await request(app)
            .post("/checkout")
            .send({
                clientId: "1",
                products: [{ productId: "1" }],
            });

        expect(response.status).toBe(200);
        expect(response.body.id).toBeDefined()
        expect(response.body.invoiceId).toBeDefined()
        expect(response.body.status).toBe("approved")
        expect(response.body.total).toBe(100)
        expect(response.body.products.length).toBe(1)
        expect(response.body.products[0].productId).toBe("1")
    });
});