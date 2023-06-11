import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import Transaction from "../../domain/transaction";
import PaymentGateway from "../../gateway/payment.gateway";
import { ProcessPaymentInputDto, ProcessPaymentOutputDto } from "./process-payment.usecase.dto";


export default class ProcessPaymentUseCase implements UseCaseInterface {
    private _paymentGateway : PaymentGateway;

    constructor(paymentGateway : PaymentGateway) {
        this._paymentGateway = paymentGateway;
    }

    async execute(input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto> {
        const transaction = new Transaction({
            amount: input.amount,
            orderId: input.orderId
        });

        transaction.process();

        const savedTransaction = await this._paymentGateway.save(transaction);

        return {
            amount: savedTransaction.amount,
            createdAt: savedTransaction.createdAt,
            orderId: savedTransaction.orderId,
            status: savedTransaction.status,
            transactionId: savedTransaction.id.id,
            updatedAt: savedTransaction.updatedAt
        }
    }

}