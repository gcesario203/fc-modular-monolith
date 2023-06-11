
import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/entity/invoice-product.entity";
import Invoice from "../../domain/entity/invoice.entity";
import Address from "../../domain/value-object/address.value-object";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const mockInvoice = new Invoice({
    id: new Id("invoice-1"),
    name: "Nota fiscal",
    address: new Address({
        city: "Americana",
        state: "SP",
        number: "14566",
        complement: "",
        street: "Rua dos bobos",
        zipCode: "67895-974"
    }),
    document: "34757653498",
    items: [
        new Product({
            id: new Id("product-1"),
            name: "Camiseta do flamengo",
            price: 300
        })
    ]
})

const mockInvoiceRepository = () => {
    return {
        find: jest.fn(),
        generate: jest.fn().mockReturnValue(Promise.resolve(mockInvoice))
    }
}

describe("generate invoice use case unit tests", () => {
    it("should generate a invoice", async () => {
        const repository = mockInvoiceRepository();

        const generateInvoiceUseCase = new GenerateInvoiceUseCase(repository);

        const input = {
            id: "invoice-1",
            name: "Nota fiscal",
            city: "Americana",
            state: "SP",
            number: "14566",
            complement: "",
            street: "Rua dos bobos",
            zipCode: "67895-974",
            document: "34757653498",
            items: [
                {
                    id: "product-1",
                    name: "Camiseta do flamengo",
                    price: 300
                }
            ]
        }

        const output = await generateInvoiceUseCase.execute(input);

        expect(input.id).toEqual(output.id)
        expect(input.name).toEqual(output.name)
        expect(input.document).toEqual(output.document)
        expect(input.items).toMatchObject(output.items)
        expect(output.total).toEqual(300)

        expect(input.city).toEqual(output.city)
        expect(input.zipCode).toEqual(output.zipCode)
        expect(input.state).toEqual(output.state)
        expect(input.street).toEqual(output.street)
        expect(input.number).toEqual(output.number)
        expect(input.complement).toEqual(output.complement)
    })
})