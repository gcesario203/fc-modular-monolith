import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import Address from "../domain/value-object/address.value-object";
import ClientGateway from "../gateway/client.gateway";
import { ClientModel } from "./client.model";


export default class ClientRepository implements ClientGateway {
  async add(client: Client): Promise<Client> {
    await ClientModel.create({
      id: client.id.id,
      name: client.name,
      email: client.email,
      city: client.address.city,
      state: client.address.state,
      street: client.address.street,
      document: client.document,
      complement: client.address.complement,
      number: client.address.number,
      zipCode: client.address.zipCode,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    })

    return client;
  }
  async find(id: string): Promise<Client> {
    const client = await ClientModel.findOne({ where: { id } });

    if (!client) {
      throw new Error("Client not found");
    }

    return new Client({
      id: new Id(client.id),
      name: client.name,
      email: client.email,
      document: client.document,
      address: new Address({
        city: client.city,
        state: client.state,
        street: client.street,
        complement: client.complement,
        number: client.number,
        zipCode: client.zipCode,
      }),
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    });
  }

}