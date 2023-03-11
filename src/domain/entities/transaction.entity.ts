import { iEntity } from '../contracts';
import { ObjectManager } from '../utils';
import { ProductEntity } from './product.entity';

export class TransactionEntity extends iEntity {
  public readonly type: 'incoming' | 'outgoing' = null;
  public readonly buyer_id: string = null;
  public readonly total_price: number = 0;
  public readonly products: Array<TransactionEntity.ProductContentTransaction> =
    [];

  constructor(transaction: Partial<TransactionEntity>) {
    super(transaction);
    ObjectManager.assing(this, transaction);
  }
}

export namespace TransactionEntity {
  export abstract class ProductContentTransaction implements Partial<ProductEntity>
  {
    public id: any;
    public name: string;
    public quantity: number;
    public sale_price: number;
    public subtotal : number;
  }
}
