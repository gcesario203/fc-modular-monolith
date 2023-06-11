import Id from "../../../../@shared/domain/value-object/id.value-object"
import Product from "../../entity/invoice-product.entity"
import Invoice from "../../entity/invoice.entity"
import Address from "../../value-object/address.value-object"
import FindInvoiceUseCase from "./find-invoice.usecase"

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
        find: jest.fn().mockReturnValue(Promise.resolve(mockInvoice)),
        generate: jest.fn()
    }
}

describe("Find invoice usecase unit tests", () => {
    it("should find a invoice", async () => {
        const repository = mockInvoiceRepository();

        const findUseCase = new FindInvoiceUseCase(repository);

        const input = {
            id: "invoice-1"
        }

        const output = await findUseCase.execute(input);

        expect(mockInvoice.id.id).toEqual(output.id)
        expect(mockInvoice.name).toEqual(output.name)
        expect(mockInvoice.document).toEqual(output.document)
        expect(mockInvoice.address).toMatchObject(output.address)
        expect(mockInvoice.items.map(item => ({
            id: item.id.id,
            name: item.name,
            price: item.price
        }))).toMatchObject(output.items)
    })
})