import { CreateIncomingTransactionForProductsData } from '../../../../data/usecases/transaction/CreateIncomingTransactionForProducts.data';
import { iCreateIncomingTransactionForProductsUsecase } from 'src/domain/usecases/transaction/iCreateTransaction.usecase';
import {
  makeProductRepository,
  makeSessionManagerDatabase,
  makeTransactionRepository,
  makeUserRepository,
} from '../../infra/database/mongo.factory';
import { QueueDriver } from '../../../../infra/queue/rabbitmq.queue';
import { NotificationHandler } from '../../../../domain/errors';
import { NotificationHandlerCreateIncomingTransactionForProducts } from '../../main/errors';

export function makeCreateTransactionUsecase(): iCreateIncomingTransactionForProductsUsecase {
  return new CreateIncomingTransactionForProductsData(
    QueueDriver,
    makeSessionManagerDatabase(),
    NotificationHandlerCreateIncomingTransactionForProducts(),
    makeUserRepository(),
    makeProductRepository(),
    makeTransactionRepository()
  );
}
