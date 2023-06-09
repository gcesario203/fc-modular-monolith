import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../repository/client.model";
import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import ClientAdmFacade from "./client-adm.facade";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";
import CLientAdmFacadeFactory from "../factory/client-adm.facade.factory";


describe('Client ADM facade test', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })


        sequelize.addModels([ClientModel]);

        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    })

    it("should create a client", async () => {
        const facade = CLientAdmFacadeFactory.create();

        const input = {
            id: "1",
            name: "Benicio de souza",
            email: "xxx@xxx.com",
            street: "Teste rua",
            document: "aaaaa",
            number: "Teste numero",
            complement: "Teste complemento",
            city: "Teste cidade",
            state: "Teste estado",
            zipCode: "Teste cep",
        };

        await facade.add(input);

        const createdClient = await ClientModel.findOne({ where: { id: input.id } });

        expect(createdClient.id).toEqual(input.id)
        expect(createdClient.name).toEqual(input.name)
        expect(createdClient.email).toEqual(input.email)
        expect(createdClient.document).toEqual(input.document)

        expect(createdClient.city).toEqual(input.city)
        expect(createdClient.state).toEqual(input.state)
        expect(createdClient.street).toEqual(input.street)
        expect(createdClient.number).toEqual(input.number)
        expect(createdClient.complement).toEqual(input.complement)
        expect(createdClient.zipCode).toEqual(input.zipCode)
    })

    it("should find a client", async () => {
        const client = await ClientModel.create({
            id: "1",
            name: "Client 1",
            email: "x@x.com",
            street: "Teste rua",
            document: "aaaaa",
            number: "Teste numero",
            complement: "Teste complemento",
            city: "Teste cidade",
            state: "Teste estado",
            zipCode: "Teste cep",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const facade = CLientAdmFacadeFactory.create();
        
        const input = {
            id: "1"
        }

        const result = await facade.find(input);

        expect(result.id).toEqual(client.id)
        expect(result.name).toEqual(client.name)
        expect(result.email).toEqual(client.email)
        expect(result.createdAt).toStrictEqual(client.createdAt)
        expect(result.updatedAt).toStrictEqual(client.updatedAt)
        expect(result.document).toStrictEqual(client.document)

        expect(result.city).toEqual(client.city)
        expect(result.state).toEqual(client.state)
        expect(result.street).toEqual(client.street)
        expect(result.number).toEqual(client.number)
        expect(result.complement).toEqual(client.complement)
        expect(result.zipCode).toEqual(client.zipCode)
    })
}
)