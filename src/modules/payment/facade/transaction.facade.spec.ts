import { Sequelize } from "sequelize-typescript";
import TransactionModel from "../repository/transaction.model";
import TransactionFactory from "../factory/transaction.factory";


describe('Transaction facade test', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })


        sequelize.addModels([TransactionModel]);

        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    })

    it("should approve a transaction", async() => {
        const input = {
            amount: 101,
            orderId: "12"
        }
        
        const facade = TransactionFactory.create();

        const result = await facade.process(input);

        expect(result.amount).toEqual(input.amount)
        expect(result.orderId).toEqual(input.orderId)
        expect(result.status).toEqual("approved")
    })

    it("should reprove a transaction", async() => {
        const input = {
            amount: 99,
            orderId: "12"
        }
        
        const facade = TransactionFactory.create();

        const result = await facade.process(input);

        expect(result.amount).toEqual(input.amount)
        expect(result.orderId).toEqual(input.orderId)
        expect(result.status).toEqual("decline")
    })
})