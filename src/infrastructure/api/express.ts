import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { ClientModel as ClientModelAdm } from "../../modules/client-adm/repository/client.model";
import { InvoiceModel } from "../../modules/invoice/repository/model/invoice.model";
import { InvoiceProductModel } from "../../modules/invoice/repository/model/invoice.product.model";
import TransactionModel from "../../modules/payment/repository/transaction.model";
import { ProductModel } from "../../modules/product-adm/repository/product.model";
import StoreProductModel from "../../modules/store-catalog/repository/product.model";
import { productRoute } from "./routes/product/product.route";
import { clientRoute } from "./routes/client/client.route";

export const app: Express = express();

app.use(express.json());

app.use('/products', productRoute)

app.use('/clients', clientRoute)

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });

  sequelize.addModels([
    ClientModelAdm,
    InvoiceModel,
    InvoiceProductModel,
    TransactionModel,
    StoreProductModel,
    ProductModel,
  ]);

  await sequelize.sync();
}

setupDb();