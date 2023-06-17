import { string } from "yup/lib/locale"
import PlaceOrderUseCase from "./place-order.usecase"
import { PlaceOrderInputDto } from "./place-order.usecase.dto"
import Product from "../../domain/product.entity"
import Id from "../../../@shared/domain/value-object/id.value-object"

describe("Place order use case unit tests", () => {

    const mockDate = new Date(2000, 1, 1)

    describe("execute method", () => {
        beforeAll(() => {
            jest.useFakeTimers("modern")
            jest.setSystemTime(mockDate)
        })

        afterAll(() => {
            jest.useRealTimers()
        })

        it("should thrown a error when client not found", async () => {
            const mockClientFacade = () => {
                return {
                    find: jest.fn().mockResolvedValue(null),
                    add: jest.fn()
                }
            }

            const placeOrderUseCase = new PlaceOrderUseCase({
                clientFacade: mockClientFacade(),
                catalogFacade: null,
                productFacade: null,
                checkoutRepository: null,
                invoiceFacade: null,
                paymentFacade: null
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
                clientFacade: mockClientFacade(),
                catalogFacade: null,
                productFacade: null,
                checkoutRepository: null,
                invoiceFacade: null,
                paymentFacade: null
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

        describe("place an order", () => {
            const clientProps = {
                id: "1c",
                name: "Client 1",
                document: "0000",
                email: "xxx@xxx.com",
                street: "Rua dos bobos",
                number: "1",
                complement: "",
                city: "americana",
                state: "sp",
                zipCode: "0000"
            }

            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(Promise.resolve(clientProps)),
                add: jest.fn()
            }

            const mockPaymentFacade = {
                process: jest.fn()
            }

            const mockCheckoutRepository = {
                addOrder: jest.fn(),
                findOrder: jest.fn()
            }

            const mockInvoiceFacade = {
                generate: jest.fn().mockResolvedValue({ id: "1i" }),
                find: jest.fn()
            }

            const placeOrderUseCase = new PlaceOrderUseCase({
                clientFacade: mockClientFacade,
                catalogFacade: null,
                productFacade: null,
                checkoutRepository: mockCheckoutRepository,
                invoiceFacade: mockInvoiceFacade,
                paymentFacade: mockPaymentFacade
            })

            const products = {
                "1": new Product({
                    id: new Id("1"),
                    name: "Product 1",
                    description: "aaaa",
                    salesPrice: 300
                }),
                "2": new Product({
                    id: new Id("2"),
                    name: "Product 2",
                    description: "aaaa",
                    salesPrice: 600
                })
            }

            const mockValidateProducts = jest
                //@ts-expect-error
                .spyOn(placeOrderUseCase, "validateProducts")
                //@ts-expect-error
                .mockResolvedValue(null)

            const mockGetProduct = jest
                //@ts-expect-error
                .spyOn(placeOrderUseCase, "getProduct")
                //@ts-expect-error
                .mockImplementation((productId: keyof typeof products) => {
                    return products[productId]
                })

            it("should not be approved", async () => {
                mockPaymentFacade.process = mockPaymentFacade.process.mockReturnValue({
                    transactionId: "1t",
                    orderId: "1o",
                    amount: 900,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });

                const input: PlaceOrderInputDto = {
                    clientId: "1c",
                    products: [{ productId: "1" }, { productId: "2" }]
                }

                let output = await placeOrderUseCase.execute(input)

                expect(output.invoiceId).toBeNull()

                expect(output.total).toBe(900)

                expect(output.products).toStrictEqual([
                    { productId: "1" },
                    { productId: "2" }
                ])

                expect(mockClientFacade.find).toHaveBeenCalledTimes(1);
                expect(mockClientFacade.find).toHaveBeenCalledWith({ id: "1c" });

                expect(mockValidateProducts).toHaveBeenCalledTimes(1);
                expect(mockValidateProducts).toHaveBeenCalledWith(input);

                expect(mockGetProduct).toHaveBeenCalledTimes(2)
                expect(mockCheckoutRepository.addOrder).toHaveBeenCalledTimes(1)

                expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1)
                expect(mockPaymentFacade.process).toHaveBeenCalledWith({
                    orderId: output.id,
                    amount: output.total
                })

                expect(mockInvoiceFacade.generate).toHaveBeenCalledTimes(0)
            })

            it("should be approved", async () => {
                const paymentProps = {
                    transactionId: "1t",
                    orderId: "1o",
                    amount: 900,
                    status: "approved",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
                mockPaymentFacade.process = mockPaymentFacade.process.mockResolvedValue(Promise.resolve(paymentProps))

                const input: PlaceOrderInputDto = {
                    clientId: "1c",
                    products: [{ productId: "1" }, { productId: "2" }]
                }

                let output = await placeOrderUseCase.execute(input)

                expect(output.invoiceId).toBeDefined();

                expect(output.total).toBe(900);

                expect(output.products).toStrictEqual([
                    { productId: "1" },
                    { productId: "2" }
                ])

                expect(mockClientFacade.find).toHaveBeenCalledTimes(1);
                expect(mockClientFacade.find).toHaveBeenCalledWith({ id: "1c" });

                expect(mockValidateProducts).toHaveBeenCalledTimes(1);
                expect(mockValidateProducts).toHaveBeenCalledWith(input);

                expect(mockGetProduct).toHaveBeenCalledTimes(2)
                expect(mockCheckoutRepository.addOrder).toHaveBeenCalledTimes(1)

                expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1)
                expect(mockPaymentFacade.process).toHaveBeenCalledWith({
                    orderId: output.id,
                    amount: output.total
                })

                expect(mockInvoiceFacade.generate).toHaveBeenCalledTimes(1)

                expect(mockInvoiceFacade.generate).toHaveBeenCalledWith({
                    name: clientProps.name,
                    city: clientProps.city,
                    complement: clientProps.complement,
                    document: clientProps.document,
                    number: clientProps.number,
                    state: clientProps.state,
                    street: clientProps.street,
                    zipCode: clientProps.zipCode,
                    id: clientProps.id,
                    items: Object.values(products).map(product => ({
                        id: product.id.id,
                        name: product.name,
                        price: product.salesPrice
                    }))
                })

                expect(output.status).toBe("approved")
            })
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