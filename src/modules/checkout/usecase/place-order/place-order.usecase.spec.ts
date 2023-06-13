import PlaceOrderUseCase from "./place-order.usecase"
import { PlaceOrderInputDto } from "./place-order.usecase.dto"

describe("Place order use case unit tests", () => {

    describe("execute method", () => {
        it("should thrown a error when client not found", async () => {
            const mockClientFacade = () => {
                return {
                    find: jest.fn().mockResolvedValue(null),
                    add: jest.fn()
                }
            }
            
            const placeOrderUseCase = new PlaceOrderUseCase({
                clientFacade: mockClientFacade()
            });

            const input: PlaceOrderInputDto = {
                clientId: "0",
                products: []
            }

            await expect(placeOrderUseCase.execute(input)).rejects.toThrow(
                new Error("Client not found")
            )
        })
    })
})