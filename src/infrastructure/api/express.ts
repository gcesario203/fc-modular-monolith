import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";

// Módulo
import { ClientModel as ClientModelAdm } from "../../modules/client-adm/repository/client.model";

// Invoice
import { InvoiceModel } from "../../modules/invoice/repository/model/invoice.model";
import { InvoiceProductModel } from "../../modules/invoice/repository/model/invoice.product.model";

// Payment
import TransactionModel from "../../modules/payment/repository/transaction.model";

// ProductAdm
import { ProductModel as ProductAdmModel } from "../../modules/product-adm/repository/product.model";

// ProductCatalog
import StoreProductModel from "../../modules/store-catalog/repository/product.model";

// Checkout
import OrderModel from "../../modules/checkout/repository/model/order.model";
import { OrderClientModel as CheckoutClientModel } from "../../modules/checkout/repository/model/client.model";
import { OrderProductModel as ProductChecktoutModel } from "../../modules/checkout/repository/model/product.model";


import { checkoutRoute } from "./routes/checkout/checkout.route";
import { productRoute } from "./routes/product/product.route";
import { clientRoute } from "./routes/client/client.route";
import { invoiceRoute } from "./routes/invoice/invoice.route";

export const app: Express = express();

app.use(express.json());

app.use('/products', productRoute)

app.use('/clients', clientRoute)

app.use('/invoice', invoiceRoute);

app.use('/checkout', checkoutRoute)

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });

  sequelize.addModels([
    OrderModel,
    ClientModelAdm,
    CheckoutClientModel,
    StoreProductModel,
    InvoiceModel,
    InvoiceProductModel,
    ProductChecktoutModel,
    TransactionModel,
    ProductAdmModel,
  ]);

  await sequelize.sync();
}

setupDb();