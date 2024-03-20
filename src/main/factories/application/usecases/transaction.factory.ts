import { CreateTransactionForProductsData } from '../../../../data/usecases/transaction/CreateTransaction.data';
import { iCreateTransactionUsecase } from '../../../../domain/usecases/transaction/iCreateTransaction.usecase';
import {
  makeProductRepository,
  makeSessionManagerDatabase,
  makeTransactionRepository,
  makeUserRepository,
} from '../../infra/database/mongo.factory';
import { QueueDriver } from '../../../../infra/queue/rabbitmq.queue';
import { NotificationHandlerCreateIncomingTransactionForProducts } from '../../main/errors';

export function makeCreateTransactionUsecase(): iCreateTransactionUsecase {
  return new CreateTransactionForProductsData(
    QueueDriver.getManager(),
    NotificationHandlerCreateIncomingTransactionForProducts(),
    makeUserRepository(),
    makeProductRepository(),
    makeTransactionRepository()
  );
}
