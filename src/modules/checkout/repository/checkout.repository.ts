import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
import Address from "../domain/value-objects/address.value-object";
import CheckoutGateway from "../gateway/checkout.gateway.interface";
import { OrderClientModel } from "./model/client.model";

import OrderModel from "./model/order.model";
import { OrderProductModel } from "./model/product.model";

export default class CheckoutRepository implements CheckoutGateway {

    async addOrder(order: Order): Promise<void> {

        await OrderModel.create({
            id: order.id.id,
            client: new OrderClientModel({
                id: order.client.id.id,
                name: order.client.name,
                email: order.client.email,
                document: order.client.document,
                street: order.client.address.street,
                number: order.client.address.number,
                complement: order.client.address.complement,
                city: order.client.address.city,
                state: order.client.address.state,
                zipCode: order.client.address.zipCode,
                createdAt: order.client.createdAt,
                updatedAt: order.client.updatedAt,
                orderId: order.id.id,
            }),
            products: order.products.map( (item) =>  (new OrderProductModel({
                id: item.id.id,
                name: item.name,
                description: item.description,
                salesPrice: item.salesPrice,
                orderId: order.id.id,
            }))),
            status: order.status,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
        },
            { include: [{ model: OrderClientModel }, { model: OrderProductModel }] });
    }

    async findOrder(id: string): Promise<Order | null> {
        const order = await OrderModel.findOne({
            where: { id },
            include: [{ model: OrderClientModel }, { model: OrderProductModel }],
        });

        if (!order) {
            throw new Error(`Order with id ${id} not found`);
        }

        return new Order({
            id: new Id(order.id),
            client: new Client({
                id: new Id(order.client.id),
                name: order.client.name,
                email: order.client.email,
                document: order.client.document,
                address: new Address({
                    street: order.client.street,
                    number: order.client.number,
                    complement: order.client.complement,
                    city: order.client.city,
                    state: order.client.state,
                    zipCode: order.client.zipCode,
                })
            }),
            products: order.products.map((item) => {
                return new Product({
                    id: new Id(item.id),
                    name: item.name,
                    description: item.description,
                    salesPrice: item.salesPrice,
                })
            }),
            status: order.status,
        });
    }
}