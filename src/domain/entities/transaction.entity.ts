import { iEntity } from "../contracts";
import { ObjectManager } from "../utils";
import { ProductEntity } from "./product.entity";

export class TransactionEntity extends iEntity {

    public readonly type : 'incoming' | 'outgoing'
    public readonly user_id : string
    public readonly products : Array<TransactionEntity.ProductContent>

    constructor(transaction : Partial<TransactionEntity>){
        super(transaction);
        ObjectManager.assing(this, transaction)
    }
}


export namespace TransactionEntity {
    export abstract class ProductContent implements Partial<ProductEntity> {
        public id: any;
        public sale_price: number;
        public quantity : number;
    }
}