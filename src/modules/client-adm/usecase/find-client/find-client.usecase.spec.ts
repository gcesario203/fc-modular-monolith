import Id from "../../../@shared/domain/value-object/id.value-object"
import Client from "../../domain/client.entity"
import FindClientUseCase from "./find-client.usecase"

const mockClient = new Client({
    id: new Id("1"),
    name: "Mauricio",
    email: "xxx@xxx.com",
    address: "akasnjsaklas"
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
        expect(result.address).toEqual(mockClient.address)
        expect(result.id).toEqual(mockClient.id.id)
        expect(result.createdAt).toEqual(mockClient.createdAt);
        expect(result.updatedAt).toEqual(mockClient.updatedAt);
    })
})