import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
import CheckoutRepository from "./checkout.repository";
import OrderModel from "./model/order.model";
import Address from "../domain/value-objects/address.value-object";
import { OrderClientModel } from "./model/client.model";
import { OrderProductModel } from "./model/product.model";

describe("CheckoutRepository test", () => {
    let sequelize: Sequelize;

    beforeAll(() => {
        jest.useFakeTimers("modern");
    });

    afterAll(() => {
        jest.useRealTimers;
    });

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([OrderModel, OrderClientModel, OrderProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should add a order", async () => {
        const OrderProps = {
            id: new Id("1"),
            client: new Client({
                id: new Id("1"),
                name: "client name",
                email: "test@domain.com",
                document: "0000000",
                address: new Address({
                    street: "16 avenus",
                    number: "123",
                    complement: "Ap 400",
                    city: "My city",
                    state: "State",
                    zipCode: "89777310"
                })
            }),
            products: [
                new Product({
                    id: new Id("1"),
                    name: "first product",
                    description: "first product description",
                    salesPrice: 10
                }),
                new Product({
                    id: new Id("2"),
                    name: "second product",
                    description: "second product description",
                    salesPrice: 20
                }),
            ],
            status: "status 1",
        };

        const order = new Order(OrderProps);
        const checkoutRepository = new CheckoutRepository();
        await checkoutRepository.addOrder(order);

        const checkoutDb = await OrderModel.findOne({
            where: { id: OrderProps.id.id },
            include: [OrderClientModel, OrderProductModel],
        });

        expect(OrderProps.id.id).toEqual(checkoutDb.id);
        expect(OrderProps.client.id.id).toEqual(checkoutDb.client.id);
        expect(OrderProps.client.name).toEqual(checkoutDb.client.name);
        expect(OrderProps.client.email).toEqual(checkoutDb.client.email);
        expect(OrderProps.client.document).toEqual(checkoutDb.client.document);
        expect(OrderProps.client.address.street).toEqual(checkoutDb.client.street)
        expect(OrderProps.client.address.number).toEqual(checkoutDb.client.number)
        expect(OrderProps.client.address.complement).toEqual(checkoutDb.client.complement)
        expect(OrderProps.client.address.city).toEqual(checkoutDb.client.city)
        expect(OrderProps.client.address.state).toEqual(checkoutDb.client.state)
        expect(OrderProps.client.address.zipCode).toEqual(checkoutDb.client.zipCode)
        expect(OrderProps.products).toStrictEqual([
            new Product({
                id: new Id(checkoutDb.products[0].id),
                name: checkoutDb.products[0].name,
                description: checkoutDb.products[0].description,
                salesPrice: checkoutDb.products[0].salesPrice,
            }),
            new Product({
                id: new Id(checkoutDb.products[1].id),
                name: checkoutDb.products[1].name,
                description: checkoutDb.products[1].description,
                salesPrice: checkoutDb.products[1].salesPrice,
            }),
        ]);
        expect(OrderProps.status).toEqual(checkoutDb.status);
    });

    it("should find a order", async () => {
        const checkoutRepository = new CheckoutRepository();

        await OrderModel.create({
            id: "1",
            client: new OrderClientModel({
                id: "1",
                name: "client name",
                email: "test@domain.com",
                document: "0000000",
                street: "16 avenus",
                number: "123",
                complement: "Ap 400",
                city: "My city",
                state: "State",
                zipCode: "89777310",
                createdAt: new Date(),
                updatedAt: new Date(),
                orderId: "1",
            }),
            products: [
                new OrderProductModel({ id: "1", name: "first product", description: "first product description", salesPrice: 10, orderId: "1" }),
                new OrderProductModel({ id: "2", name: "second product", description: "second product description", salesPrice: 20, orderId: "1" }),
            ],
            status: "status 1",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
            { include: [OrderClientModel, OrderProductModel] });

        const checkout = await checkoutRepository.findOrder("1");

        expect(checkout.id.id).toEqual("1");
        expect(checkout.client.name).toEqual("client name");
        expect(checkout.client.email).toEqual("test@domain.com");
        expect(checkout.client.document).toEqual("0000000")
        expect(checkout.client.address.street).toEqual("16 avenus")
        expect(checkout.client.address.number).toEqual("123")
        expect(checkout.client.address.complement).toEqual("Ap 400")
        expect(checkout.client.address.city).toEqual("My city")
        expect(checkout.client.address.state).toEqual("State")
        expect(checkout.client.address.zipCode).toEqual("89777310")
        expect(checkout.products).toStrictEqual([
            new Product({ id: new Id("1"), name: "first product", description: "first product description", salesPrice: 10 }),
            new Product({ id: new Id("2"), name: "second product", description: "second product description", salesPrice: 20 }),
        ]);
        expect(checkout.status).toEqual("status 1");
    });
});