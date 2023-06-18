import { Sequelize } from "sequelize-typescript";
import OrderModel from "../repository/model/order.model";
import { OrderProductModel as CheckoutProductModel } from "../repository/model/product.model";
import { OrderClientModel as CheckoutClientModel } from "../repository/model/client.model";
import CheckoutFacadeFactory from "../factory/checkout.facade.factory";
import { PlaceOrderInputDto } from "../usecase/place-order/place-order.usecase.dto";
import { ClientModel as ClientModelAdm } from "../../client-adm/repository/client.model";
import { default as StoreProductModel } from "../../store-catalog/repository/product.model";
import { InvoiceModel } from "../../invoice/repository/model/invoice.model";
import { InvoiceProductModel } from "../../invoice/repository/model/invoice.product.model";
import TransactionModel from "../../payment/repository/transaction.model";
import { ProductAdmModel } from "../../product-adm/repository/product.model";

describe('Invoice repository test', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })


        await sequelize.addModels([
            OrderModel,
            ClientModelAdm,
            CheckoutClientModel,
            StoreProductModel,
            InvoiceModel,
            InvoiceProductModel,
            CheckoutProductModel,
            TransactionModel,
            ProductAdmModel,
        ]);

        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    })

    const checkoutFacade = CheckoutFacadeFactory.create();

    it("should thrown a error when client not found", async () => {
        const input: PlaceOrderInputDto = {
            clientId: "0",
            products: []
        }

        await expect(checkoutFacade.placeOrder(input)).rejects.toThrow(
            new Error("Client not found")
        )
    })
}
)