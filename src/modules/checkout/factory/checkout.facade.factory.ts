import CLientAdmFacadeFactory from "../../client-adm/factory/client-adm.facade.factory";
import InvoiceFacadeFactory from "../../invoice/factory/invoice.facade.factory";
import TransactionFactory from "../../payment/factory/transaction.factory";
import ProductAdmFacadeFactory from "../../product-adm/factory/facade.factory";
import StoreCatalogeFacadeFactory from "../../store-catalog/factory/facade.factory";
import CheckoutFacade from "../facade/checkout.facade";
import CheckoutRepository from "../repository/checkout.repository";
import PlaceOrderUseCase from "../usecase/place-order/place-order.usecase";


export default class CheckoutFacadeFactory {
    static create(){
        const checkoutRepository = new CheckoutRepository();

        const placeOrderUseCase = new PlaceOrderUseCase({
            catalogFacade: StoreCatalogeFacadeFactory.create(),
            checkoutRepository: checkoutRepository,
            clientFacade: CLientAdmFacadeFactory.create(),
            invoiceFacade: InvoiceFacadeFactory.create(),
            paymentFacade: TransactionFactory.create(),
            productFacade: ProductAdmFacadeFactory.create()
        });

        return new CheckoutFacade(placeOrderUseCase);
    }
}