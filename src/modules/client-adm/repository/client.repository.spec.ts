import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "./client.model";
import ClientRepository from "./client.repository";
import Client from "../domain/client.entity";
import Id from "../../@shared/domain/value-object/id.value-object";


describe('Client repository test', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })


        await sequelize.addModels([ClientModel]);

        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    })

    it("should find a client", async () => {
        const client = await ClientModel.create({
          id: "1",
          name: "Client 1",
          email: "x@x.com",
          address: "Address 1",
          createdAt: new Date(),
          updatedAt: new Date(),
        });
    
        const repository = new ClientRepository();
        const result = await repository.find(client.id);

        expect(result.id.id).toEqual(client.id);
        expect(result.name).toEqual(client.name);
        expect(result.email).toEqual(client.email);
        expect(result.address).toEqual(client.address);
        expect(result.createdAt).toStrictEqual(client.createdAt);
        expect(result.updatedAt).toStrictEqual(client.updatedAt);
      });

      it("should create a client", async () => {
        const client = new Client({
            id: new Id("1"),
            name: "Mauricio",
            address: "xxxfff",
            email: "xxx@xxx.com",
            createdAt: new Date(),
            updatedAt: new Date()
        })

        const repository = new ClientRepository();
        await repository.add(client);

        const createdClient = await ClientModel.findOne({ where: { id: "1" }  });

        expect(client.id.id).toEqual(createdClient.id);
        expect(client.name).toEqual(createdClient.name);
        expect(client.address).toEqual(createdClient.address);
        expect(client.email).toEqual(createdClient.email);
        expect(client.updatedAt).toStrictEqual(createdClient.updatedAt);
        expect(client.createdAt).toStrictEqual(createdClient.createdAt);
    })
})