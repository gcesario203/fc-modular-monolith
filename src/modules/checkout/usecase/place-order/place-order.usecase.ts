import { bool } from "yup";
import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import ClientAdmFacadeInterface from "../../../client-adm/facade/client-adm.facade.interface";
import ProductAdmFacadeInterface from "../../../product-adm/facade/product-adm.facade.interface";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.usecase.dto";
import StoreCatalogFacadeInterface from "../../../store-catalog/facade/store-catalog.facade.interface";
import Product from "../../domain/product.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import Order from "../../domain/order.entity";
import TransactionFacadeInterface from "../../../payment/facade/transaction.facade.interface";
import InvoiceFacadeInterface from "../../../invoice/facade/invoice.facade.interface";
import CheckoutGateway from "../../gateway/checkout.gateway.interface";


type PlaceOrderUseCaseProps = {
    clientFacade: ClientAdmFacadeInterface
    productFacade: ProductAdmFacadeInterface
    catalogFacade: StoreCatalogFacadeInterface
    paymentFacade: TransactionFacadeInterface
    invoiceFacade: InvoiceFacadeInterface
    checkoutRepository: CheckoutGateway
}

export default class PlaceOrderUseCase implements UseCaseInterface {

    private _clientFacade: ClientAdmFacadeInterface
    private _productFacade: ProductAdmFacadeInterface
    private _catalogFacade: StoreCatalogFacadeInterface
    private _paymentFacade: TransactionFacadeInterface
    private _invoiceFacade: InvoiceFacadeInterface
    private _checkoutRepository: CheckoutGateway

    constructor(props: PlaceOrderUseCaseProps) {
        this._clientFacade = (props || {}).clientFacade || null

        this._productFacade = (props || {}).productFacade || null
        this._catalogFacade = (props || {}).catalogFacade || null

        this._invoiceFacade = (props || {}).invoiceFacade || null

        this._paymentFacade = (props || {}).paymentFacade || null

        this._checkoutRepository =  (props || {}).checkoutRepository || null
    }


    async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {

        const client = await this._clientFacade.find({ id: input.clientId});

        if(!client) throw new Error("Client not found");

        await this.validateProducts(input);

        const products = await Promise.all(
            input.products.map(product => this.getProduct(product.productId))
        )

        const clientToExcute = new Client({
            address: client.address,
            email: client.email,
            name: client.name,
            id: new Id(client.id)
        });

        const order = new Order({
            client: clientToExcute,
            products
        })

        return {
            id: "",
            invoiceId: "",
            products: [],
            status: "",
            total: 0
        }
    }

    private async validateProducts(input: PlaceOrderInputDto) : Promise<void> {
        if(!input.products || !input.products.length) throw new Error("No products selected")

        await this.validateIfTheProductsAreInStock(input);
    }

    private async validateIfTheProductsAreInStock(input: PlaceOrderInputDto) : Promise<void> {
        for(const productInput of input.products)
        {
            const product = await this._productFacade.checkStock(productInput);

            if(!product || product.stock <= 0)
                throw new Error(`product ${product.productId} is not available in stock`)
        }
    }

    private async getProduct(id: string) : Promise<Product>{
        const product = await this._catalogFacade.find({id})

        if(!product) throw new Error("Product not found")

        return new Product({
            id: new Id(product.id),
            description: product.description,
            name: product.name,
            salesPrice: product.salesPrice
        })
    }

}