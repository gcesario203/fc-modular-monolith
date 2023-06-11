import { Model, HasMany, PrimaryKey, Column, Table } from "sequelize-typescript";
import {InvoiceProductModel} from "./invoice.product.model";

@Table({
    tableName: 'invoice',
    timestamps: false
})
export class InvoiceModel extends Model {

    @PrimaryKey
    @Column({ allowNull: false })
    id: string;

    @Column({ allowNull: false })
    name: string;

    @Column({ allowNull: false })
    document: string;

    @Column({ allowNull: false })
    street: string;

    @Column({ allowNull: false })
    number: string;

    @Column
    complement: string;

    @Column({ allowNull: false })
    city: string;

    @Column({ allowNull: false })
    state: string;

    @Column({ allowNull: false })
    zipCode: string;

    @HasMany(() => InvoiceProductModel)
    items: InvoiceProductModel[]

    @Column({ allowNull: false })
    createdAt: Date;

    @Column({ allowNull: false })
    updatedAt: Date;
}