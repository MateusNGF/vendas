import { iUsecase } from 'src/domain/contracts';
import { iCreateTransactionUsecase } from '../transaction/iCreateTransaction.usecase';

export abstract class iRemoveProductUsecase implements iUsecase {
  abstract exec(input: iRemoveProductUsecase.Input, options: iRemoveProductUsecase.Options): Promise<iRemoveProductUsecase.Output>;
}

export namespace iRemoveProductUsecase {
  export interface Input {
    user_id: string;
    products: Array<ProductInformation>;
  }

  export interface Options extends iUsecase.Options {
    createTransaction?: boolean;
  }

  export class ProductInformation {
    public id: string;
    public discount?: number;
    public quantity: number;
  }

  export interface Output {
    productsIds: Array<string>;
    transaction?: iCreateTransactionUsecase.Output;
  }
}
