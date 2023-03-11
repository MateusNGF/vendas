import { iController } from '../../../../application/contracts';
import { CreateTransactionController } from '../../../../application/controllers/transaction/CreateIncomingTransactionForProducts.controller';
import { makeSessionDatabase } from '../../infra/database/mongo.factory';
import { makeCreateTransactionUsecase } from '../usecases/transaction.factory';

export function makeCreateTransactionController(): iController {
  return new CreateTransactionController(
    makeSessionDatabase(),
    makeCreateTransactionUsecase());
}
