import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "./client.model";
import ClientRepository from "./client.repository";
import Client from "../domain/client.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../domain/value-object/address.value-object";


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
            street: "Teste rua",
            number: "Teste numero",
            document: "teste docs",
            complement: "Teste complemento",
            city: "Teste cidade",
            state: "Teste estado",
            zipCode: "Teste cep",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const repository = new ClientRepository();
        const result = await repository.find(client.id);

        expect(result.id.id).toEqual(client.id);
        expect(result.name).toEqual(client.name);
        expect(result.email).toEqual(client.email);
        
        expect(result.createdAt).toStrictEqual(client.createdAt);
        expect(result.updatedAt).toStrictEqual(client.updatedAt);
        expect(result.document).toStrictEqual(client.document);

        expect(result.address.city).toEqual(client.city);
        expect(result.address.state).toEqual(client.state);
        expect(result.address.complement).toEqual(client.complement);
        expect(result.address.number).toEqual(client.number);
        expect(result.address.street).toEqual(client.street);
        expect(result.address.zipCode).toEqual(client.zipCode);
    });

    it("should create a client", async () => {
        const client = new Client({
            id: new Id("1"),
            name: "Mauricio",
            document: "xxxx",
            address: new Address({
                street: "Teste rua",
                number: "Teste numero",
                complement: "Teste complemento",
                city: "Teste cidade",
                state: "Teste estado",
                zipCode: "Teste cep",
            }),
            email: "xxx@xxx.com",
            createdAt: new Date(),
            updatedAt: new Date()
        })

        const repository = new ClientRepository();
        await repository.add(client);

        const createdClient = await ClientModel.findOne({ where: { id: "1" } });

        expect(client.id.id).toEqual(createdClient.id);
        expect(client.name).toEqual(createdClient.name);

        expect(client.email).toEqual(createdClient.email);
        expect(client.updatedAt).toStrictEqual(createdClient.updatedAt);
        expect(client.createdAt).toStrictEqual(createdClient.createdAt);
        expect(client.document).toStrictEqual(createdClient.document);


        expect(client.address.city).toEqual(createdClient.city);
        expect(client.address.state).toEqual(createdClient.state);
        expect(client.address.street).toEqual(createdClient.street);
        expect(client.address.number).toEqual(createdClient.number);
        expect(client.address.complement).toEqual(createdClient.complement);
        expect(client.address.zipCode).toEqual(createdClient.zipCode);

    })
})