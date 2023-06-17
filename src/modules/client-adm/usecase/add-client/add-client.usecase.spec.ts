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
            email: "xxx@xxx.com",
            name: "Flavio augusto",
            street: "Teste rua",
            number: "Teste numero",
            complement: "Teste complemento",
            city: "Teste cidade",
            state: "Teste estado",
            zipCode: "Teste cep",
            document: "Teste documento"
        };

        const result = await addClientUseCase.execute(input);

        expect(clientRepository.add).toBeCalled();

        expect(result.name).toEqual(input.name)
        expect(result.email).toEqual(input.email)
        expect(result.document).toEqual(input.document)
        expect(result.id).toBeDefined()


        expect(result.street).toEqual(input.street)
        expect(result.city).toEqual(input.city)
        expect(result.zipCode).toEqual(input.zipCode)
        expect(result.state).toEqual(input.state)
        expect(result.number).toEqual(input.number)
        expect(result.complement).toEqual(input.complement)
    })
})