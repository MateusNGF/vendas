import { iEntity } from "../contracts";
import { ObjectManager } from "../utils";

export class ProductEntity extends iEntity {

    public readonly name : string = null;
    public readonly sale_price : number = 0;
    public readonly stock : number = 0;
    public readonly created_by : string = null;

    constructor(product : ProductEntity){
        super(product);
        ObjectManager.assing(this, product)
    }
}