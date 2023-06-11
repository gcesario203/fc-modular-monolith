import TransactionFacade from "../facade/transaction.facade";
import TransactionRepository from "../repository/transaction.repository";
import ProcessPaymentUseCase from "../usecase/process-payment/process-payment.usecase";


export default class TransactionFactory {
    static create(){
        const repository = new TransactionRepository();

        const processUseCase = new ProcessPaymentUseCase(repository);

        return new TransactionFacade({
            processUseCase
        })
    }
}