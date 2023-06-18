import { Column, HasMany, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import { OrderClientModel } from "./client.model";
import { OrderProductModel } from "./product.model";


@Table({ tableName: "orders-products", timestamps: false })
export default class OrderModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @HasOne(() => OrderClientModel)
  client: OrderClientModel;

  @HasMany(() => OrderProductModel)
  products: OrderProductModel[];

  @Column({ allowNull: false })
  status: string;

  @Column({ allowNull: false })
  createdAt: Date;

  @Column({ allowNull: false })
  updatedAt: Date;
}