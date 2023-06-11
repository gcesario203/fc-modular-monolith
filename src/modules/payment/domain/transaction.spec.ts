import Transaction from "./transaction"


describe("payment transaction entity unit tests", () => {
    it("should create a pending payment", () => {
        const payment = new Transaction({
            orderId: "1",
            amount: 2
        });

        expect(payment.status).toBe("pending")
    })

    it("should not create a payment without amount", () => {
        expect(() => new Transaction({
            orderId: "1",
            amount: 0
        })).toThrow("Amount must be greater than zero")
    })

    it("should approve payment with a amount are equals or greater than 100", () => {
        const payment = new Transaction({
            orderId: "1",
            amount: 100
        });

        payment.process();

        expect(payment.status).toBe("approved");
    })

    it("should decline payment with a amount are equals or lower than 100", () => {
        const payment = new Transaction({
            orderId: "1",
            amount: 99
        });

        payment.process();

        expect(payment.status).toBe("decline");
    })
})