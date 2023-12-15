import { iEntity } from '../contracts';
import { ObjectManager } from '../utils';
import { ProductEntity } from './product.entity';

export class TransactionEntity extends iEntity {
  public readonly type: 'incoming' | 'outgoing' = null;
  public readonly user_id: string = null;
  public readonly customer_id?: string = null;
  public readonly total_price: number = 0;
  public readonly products: Array<TransactionEntity.ProductContentTransaction> =
    [];

  constructor(transaction: Partial<TransactionEntity>) {
    super(transaction);
    ObjectManager.assing(this, transaction);
  }
}

export namespace TransactionEntity {
  export abstract class ProductIncomingTransaction
    implements Partial<ProductEntity>
  {
    public id: any;
    public quantity: number;
  }

  export abstract class ProductContentTransaction extends ProductIncomingTransaction {
    public name: string;
    public sale_price: number;
  }
}
