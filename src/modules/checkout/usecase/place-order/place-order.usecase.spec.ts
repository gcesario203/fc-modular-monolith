import { string } from "yup/lib/locale"
import PlaceOrderUseCase from "./place-order.usecase"
import { PlaceOrderInputDto } from "./place-order.usecase.dto"
import Product from "../../domain/product.entity"
import Id from "../../../@shared/domain/value-object/id.value-object"

describe("Place order use case unit tests", () => {

    const mockDate = new Date(2000, 1, 1)

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

        it("should throw an error when products are not valid", async () => {
            const mockClientFacade = () => {
                return {
                    find: jest.fn().mockResolvedValue(true),
                    add: jest.fn()
                }
            }

            const placeOrderUseCase = new PlaceOrderUseCase({
                clientFacade: mockClientFacade()
            });

            const input: PlaceOrderInputDto = {
                clientId: "1",
                products: []
            }

            const mockValidateProducts = jest
                //@ts-expect-error
                .spyOn(placeOrderUseCase, "validateProducts")
                //@ts-expect-error
                .mockRejectedValue(new Error("No products selected"))


            await expect(placeOrderUseCase.execute(input)).rejects.toThrow(
                new Error("No products selected")
            )

            expect(mockValidateProducts).toHaveBeenCalledTimes(1)
        })
    })

    describe("get products method", () => {
        beforeAll(() => {
            jest.useFakeTimers("modern")
            jest.setSystemTime(mockDate)
        })

        afterAll(() => {
            jest.useRealTimers()
        })

        //@ts-expect-error - no params in constructor
        const placeOrderUseCase = new PlaceOrderUseCase();

        it("should throw error when product not found", async () => {
            const mockCatalogFacade = {
                find: jest.fn().mockResolvedValue(null)
            }

            //@ts-expect-error
            placeOrderUseCase["_catalogFacade"] = mockCatalogFacade;

            await expect(placeOrderUseCase["getProduct"]("0")).rejects.toThrow(
                new Error("Product not found")
            )
        })

        it("should return a product", async () => {
            const mockCatalogFacade = {
                find: jest.fn().mockResolvedValue(Promise.resolve({
                    id: "1",
                    description: "Produto registrado dia x",
                    name: "Camiseta do vasco",
                    salesPrice: 50
                }))
            }

            //@ts-expect-error
            placeOrderUseCase["_catalogFacade"] = mockCatalogFacade;


            await expect(placeOrderUseCase["getProduct"]("0")).resolves.toEqual(
                new Product({
                    id: new Id("1"),
                    description: "Produto registrado dia x",
                    name: "Camiseta do vasco",
                    salesPrice: 50
                })
            )

            expect(mockCatalogFacade.find).toHaveBeenCalledTimes(1)
        })
    })

    describe("validate products method", () => {

        //@ts-expect-error - no params in constructor
        const placeOrderUseCase = new PlaceOrderUseCase();

        it("should throw error when no products selected", async () => {
            const input: PlaceOrderInputDto = {
                clientId: "1",
                products: []
            }

            await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow(new Error("No products selected"))
        })

        it("should throw an error when product is out of stock", async () => {
            const mockProductFacade = {
                checkStock: jest.fn(({ productId }: { productId: string }) => Promise.resolve({
                    productId,
                    stock: productId == "1" ? 0 : 1
                }))
            }

            //@ts-expect-error - force set product facade
            placeOrderUseCase["_productFacade"] = mockProductFacade

            let input: PlaceOrderInputDto = {
                clientId: "2",
                products: [{
                    productId: "1"
                }]
            }

            await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow(
                new Error("product 1 is not available in stock")
            )

            input = {
                clientId: "1",
                products: [
                    {
                        productId: "0"
                    },
                    {
                        productId: "1"
                    }
                ]
            }

            await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow(
                new Error("product 1 is not available in stock")
            )

            expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(3)

            input = {
                clientId: "3",
                products: [
                    {
                        productId: "3"
                    },
                    {
                        productId: "4"
                    },
                    {
                        productId: "2"
                    },
                ]
            }

            expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(3)
        })
    })
})