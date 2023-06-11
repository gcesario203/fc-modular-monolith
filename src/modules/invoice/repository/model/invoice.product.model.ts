import { Model, Table, PrimaryKey, Column, ForeignKey } from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";

@Table({
    tableName: 'invoice-products',
    timestamps: false
})
export class InvoiceProductModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    id: string

    @Column({ allowNull: false })
    name: string

    @Column({ allowNull: false })
    price: number

    @ForeignKey(() => InvoiceModel)
    @Column({ allowNull: false })
    invoiceId: string

    @Column({ allowNull: false })
    createdAt: Date;

    @Column({ allowNull: false })
    updatedAt: Date;
}