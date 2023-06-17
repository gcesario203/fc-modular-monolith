import Id from "../../../@shared/domain/value-object/id.value-object"
import Client from "../../domain/client.entity"
import Address from "../../domain/value-object/address.value-object"
import FindClientUseCase from "./find-client.usecase"

const mockClient = new Client({
    id: new Id("1"),
    name: "Mauricio",
    email: "xxx@xxx.com",
    document: "11111",
    address: new Address({
        street: "Teste rua",
        number: "Teste numero",
        complement: "Teste complemento",
        city: "Teste cidade",
        state: "Teste estado",
        zipCode: "Teste cep",
    })
})


const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(mockClient))
    }
}

describe("Find client usecase unit test", () => {

    it("should find a client", async () => {
        const clientRepository = MockRepository();

        const findClientUseCase = new FindClientUseCase(clientRepository);

        const input =
        {
            id: "1"
        };

        const result = await findClientUseCase.execute(input);

        expect(clientRepository.find).toBeCalled();

        expect(result.name).toEqual(mockClient.name)
        expect(result.email).toEqual(mockClient.email)

        expect(result.id).toEqual(mockClient.id.id)
        expect(result.createdAt).toEqual(mockClient.createdAt);
        expect(result.updatedAt).toEqual(mockClient.updatedAt);
        expect(result.document).toEqual(mockClient.document);

        expect(result.city).toEqual(mockClient.address.city)
        expect(result.state).toEqual(mockClient.address.state)
        expect(result.street).toEqual(mockClient.address.street)
        expect(result.number).toEqual(mockClient.address.number)
        expect(result.complement).toEqual(mockClient.address.complement)
        expect(result.zipCode).toEqual(mockClient.address.zipCode)
    })
})