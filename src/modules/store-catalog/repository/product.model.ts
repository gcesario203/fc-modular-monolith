import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";


@Table({
    tableName: "storage-products",
    timestamps: false
})
export default class StorageProductModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    id: string;

    @Column({ allowNull: false })
    name: string;

    @Column({ allowNull: false })
    description: string;

    @Column({ allowNull: false})
    salesPrice: number;
}