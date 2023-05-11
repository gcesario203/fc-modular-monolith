import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

type ProductProps = {
    id: Id,
    name: string,
    description: string,
    salePrice: number,
}

export default class Product extends BaseEntity implements AggregateRoot{
    private _name: string;
    private _description: string;
    private _salePrice: number;

    constructor(props: ProductProps) {
        super(props.id);
        
        this._name = props.name;

        this._description = props.description;

        this._salePrice = props.salePrice;
    }

    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
    }

    get salePrice(): number {
        return this._salePrice;
    }
}