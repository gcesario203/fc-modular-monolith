import Id from "../../../@shared/domain/value-object/id.value-object";
import AddClientUseCase from "./add-client.usecase";

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn()
    }
}

describe("Add client usecase unit test", () => {

    it("should add a client", async () => {
        const clientRepository = MockRepository();

        const addClientUseCase = new AddClientUseCase(clientRepository);

        const input =
        {
            address: "Rua dos bobos",
            email: "xxx@xxx.com",
            name: "Flavio augusto"
        };

        const result = await addClientUseCase.execute(input);

        expect(clientRepository.add).toBeCalled();

        expect(result.name).toEqual(input.name)
        expect(result.email).toEqual(input.email)
        expect(result.address).toEqual(input.address)
        expect(result.id).toBeDefined()
    })
})