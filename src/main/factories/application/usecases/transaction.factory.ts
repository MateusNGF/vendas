import { CreateIncomingTransactionForProductsData } from '../../../../data/usecases/transaction/CreateIncomingTransactionForProducts.data';
import { iCreateIncomingTransactionForProductsUsecase } from 'src/domain/usecases/transaction/iCreateTransaction.usecase';
import {
  makeProductRepository,
  makeSessionManagerDatabase,
  makeTransactionRepository,
  makeUserRepository,
} from '../../infra/database/mongo.factory';

export function makeCreateTransactionUsecase(): iCreateIncomingTransactionForProductsUsecase {
  return new CreateIncomingTransactionForProductsData(
    makeSessionManagerDatabase(),
    makeUserRepository(),
    makeProductRepository(),
    makeTransactionRepository()
  );
}
