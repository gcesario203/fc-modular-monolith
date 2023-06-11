import { Sequelize } from "sequelize-typescript";
import TransactionModel from "./transaction.model";
import TransactionRepository from "./transaction.repository";
import Transaction from "../domain/transaction";
import Id from "../../@shared/domain/value-object/id.value-object";


describe('Transaction repository test', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })


        await sequelize.addModels([TransactionModel]);

        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    })

    it("should save a transaction", async () => {
        const repository = new TransactionRepository();

        const newTransaction = new Transaction({
            id: new Id("1"),
            amount: 100,
            orderId: "1",
            createdAt: new Date(),
            updatedAt: new Date()
        })

        const result = await repository.save(newTransaction);

        const savedTransaction = await TransactionModel.findOne({ where: { id: newTransaction.id.id }});

        expect(result.id.id).toEqual(savedTransaction.id)
        expect(result.amount).toEqual(savedTransaction.amount)
        expect(result.orderId).toEqual(savedTransaction.orderId)
        expect(result.status).toEqual(savedTransaction.status)
        expect(result.createdAt).toStrictEqual(savedTransaction.createdAt)
        expect(result.updatedAt).toStrictEqual(savedTransaction.updatedAt)
    })
})