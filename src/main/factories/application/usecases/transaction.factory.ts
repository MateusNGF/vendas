import { CreateIncomingTransactionForProductsData } from '../../../../data/usecases/transaction/CreateIncomingTransactionForProducts.data';
import { iCreateIncomingTransactionForProductsUsecase } from 'src/domain/usecases/transaction/iCreateTransaction.usecase';
import {
  makeProductRepository,
  makeSessionManagerDatabase,
  makeTransactionRepository,
  makeUserRepository,
} from '../../infra/database/mongo.factory';
import { QueueDriver } from '../../../../infra/queue/rabbitmq.queue';
import { NotificationHandlerCreateIncomingTransactionForProducts } from '../../main/errors';

export function makeCreateTransactionUsecase(): iCreateIncomingTransactionForProductsUsecase {
  return new CreateIncomingTransactionForProductsData(
    QueueDriver.getManager(),
    makeSessionManagerDatabase(),
    NotificationHandlerCreateIncomingTransactionForProducts(),
    makeUserRepository(),
    makeProductRepository(),
    makeTransactionRepository()
  );
}
