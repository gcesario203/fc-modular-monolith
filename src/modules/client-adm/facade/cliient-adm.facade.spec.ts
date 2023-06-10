import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../repository/client.model";
import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import ClientAdmFacade from "./client-adm.facade";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";


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
        const repository = new ClientRepository();

        const addUseCase = new AddClientUseCase(repository);

        const facade = new ClientAdmFacade({
            addUseCase: addUseCase,
            findUseCase: undefined
        });

        const input = {
            id: "1",
            name: "Benicio de souza",
            email: "xxx@xxx.com",
            address: "bnklfbjkfbfjk"
        };

        await facade.add(input);

        const createdClient = await ClientModel.findOne({ where: { id: input.id } });

        expect(createdClient.id).toEqual(input.id)
        expect(createdClient.name).toEqual(input.name)
        expect(createdClient.address).toEqual(input.address)
        expect(createdClient.email).toEqual(input.email)
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

        const findUseCase = new FindClientUseCase(repository);

        const facade = new ClientAdmFacade({
            findUseCase: findUseCase,
            addUseCase: undefined
        })
        
        const input = {
            id: "1"
        }

        const result = await facade.find(input);

        expect(result.id).toEqual(client.id)
        expect(result.name).toEqual(client.name)
        expect(result.address).toEqual(client.address)
        expect(result.email).toEqual(client.email)
        expect(result.createdAt).toStrictEqual(client.createdAt)
        expect(result.updatedAt).toStrictEqual(client.updatedAt)
    })
}
)