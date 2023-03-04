import { iController } from '../../../../application/contracts';
import { CreateTransactionController } from '../../../../application/controllers/transaction/CreateIncomingTransactionForProducts.controller';
import { makeCreateTransactionUsecase } from '../usecases/transaction.factory';

export function makeCreateTransactionController(): iController {
  return new CreateTransactionController(makeCreateTransactionUsecase());
}
