import { iUsecase } from 'src/domain/contracts';
import { TransactionEntity } from 'src/domain/entities/transaction.entity';

export abstract class iCreateTransactionUsecase implements iUsecase {
  abstract exec(
    input: iCreateTransactionUsecase.Input,
    options?: iCreateTransactionUsecase.Options
  ): Promise<iCreateTransactionUsecase.Output>;
}

export namespace iCreateTransactionUsecase {
  export interface Input {
    customer_id?: string;
    type: 'incoming' | 'outgoing';
    user_id: string;
    products: Array<TransactionEntity.ProductIncomingTransaction>;
  }

  export type Output = {
    id: string;
    created_at: Date;
  };

  export interface Options extends iUsecase.Options {}
}
