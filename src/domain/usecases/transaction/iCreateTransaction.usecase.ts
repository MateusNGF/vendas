import { iUsecase } from 'src/domain/contracts';
import { TransactionEntity } from 'src/domain/entities/transaction.entity';

export abstract class iCreateIncomingTransactionForProductsUsecase
  implements iUsecase
{
  abstract exec(
    input: iCreateIncomingTransactionForProductsUsecase.Input,
    settings ?: iCreateIncomingTransactionForProductsUsecase.Settings
  ): Promise<iCreateIncomingTransactionForProductsUsecase.Output>;
}

export namespace iCreateIncomingTransactionForProductsUsecase {
  export abstract class Input implements Partial<TransactionEntity> {
    buyer_id: string;
    products_sold: Array<TransactionEntity.ProductContentTransaction>;
  };

  export interface Settings extends iUsecase.Configuration { };

  export abstract class Output {
    id: string;
    created_at: Date;
  };
}
