import { iController } from '../../../../application/contracts';
import { CreateTransactionController } from '../../../../application/controllers/transaction/CreateTransactionForProducts.controller';
import { NotificationHandlerCreateIncomingTransactionForProducts } from '../../main/errors';
import { makeCreateTransactionUsecase } from '../usecases/transaction.factory';

export function makeCreateTransactionController(): iController {
  return new CreateTransactionController(makeCreateTransactionUsecase());
}
