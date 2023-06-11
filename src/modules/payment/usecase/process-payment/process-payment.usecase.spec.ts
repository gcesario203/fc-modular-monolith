import Transaction from "../../domain/transaction"
import ProcessPaymentUseCase from "./process-payment.usecase"

const approvableInput = {
    amount: 100,
    orderId: "1",
}

const reprovableInput = {
    amount: 99,
    orderId: "1",
}

const mockAprrovableTransaction = new Transaction(approvableInput)

mockAprrovableTransaction.process();

const mockDeclineableTransaction = new Transaction(reprovableInput);

mockDeclineableTransaction.process();

const mockPaymentRepositoryWithApprovablePayment = () => {
    return {
        save: jest.fn().mockReturnValue(Promise.resolve(mockAprrovableTransaction))
    }
}

const mockPaymentRepositoryWithDeclineablePayment = () => {
    return {
        save: jest.fn().mockReturnValue(Promise.resolve(mockDeclineableTransaction))
    }
}

describe("Process payment unit tests", () => {
    it("should approve a transaction", async () => {
        const repository = mockPaymentRepositoryWithApprovablePayment();

        const processPaymentUseCase = new ProcessPaymentUseCase(repository);

        const result = await processPaymentUseCase.execute(approvableInput);

        expect(repository.save).toBeCalled();

        expect(result.amount).toEqual(approvableInput.amount)
        expect(result.orderId).toEqual(approvableInput.orderId)
        expect(result.status).toEqual("approved")
    })

    it("should decline a transaction", async () => {
        const repository = mockPaymentRepositoryWithDeclineablePayment();

        const processPaymentUseCase = new ProcessPaymentUseCase(repository);

        const result = await processPaymentUseCase.execute(reprovableInput);

        expect(repository.save).toBeCalled();

        expect(result.amount).toEqual(reprovableInput.amount)
        expect(result.orderId).toEqual(reprovableInput.orderId)
        expect(result.status).toEqual("decline")
    })
})