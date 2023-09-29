import { iController } from '../../contracts';
import { HttpRequest, HttpResponse } from 'src/application/helpers/http';
import { TransactionEntity } from 'src/domain/entities/transaction.entity';
import { iCreateIncomingTransactionForProductsUsecase } from 'src/domain/usecases/transaction/iCreateTransaction.usecase';
import { ObjectManager } from '../../../domain/utils';
import { OperationFailed } from '../../../domain/errors';
import { NotificationHandlerCreateIncomingTransactionForProducts } from '../../../main/factories/main/errors';

export class CreateTransactionController extends iController {
  constructor(
    private readonly createTransactionUsecase: iCreateIncomingTransactionForProductsUsecase
  ) {
    super();
  }

  async exec(request: HttpRequest): Promise<HttpResponse> {
    try {
      const content: iCreateIncomingTransactionForProductsUsecase.Input = request.body;
      const notificationErrorHandler = NotificationHandlerCreateIncomingTransactionForProducts()
      

      ObjectManager.hasKeysWithNotification<iCreateIncomingTransactionForProductsUsecase.Input>(
        ['user_id', 'products'],
        content,
        notificationErrorHandler
      );

      notificationErrorHandler.CheckToNextStep();

      if (content.products.length < 1)
        throw new OperationFailed('Need one or more products for creating transaction.');

      ObjectManager.hasKeysWithNotification<TransactionEntity.ProductIncomingTransaction>(
        ['id', 'quantity'],
        content.products,
        notificationErrorHandler
      );

      notificationErrorHandler.CheckToNextStep();


      const transactionPartialData = await this.createTransactionUsecase.exec({
        user_id: content.user_id,
        products: content.products,
      });

      if (!transactionPartialData) throw new OperationFailed('Operation failed, try later.');

      return this.sendSucess(200, {
        transaction_id: transactionPartialData.id,
      });
    } catch (e) {
      return this.sendError(e);
    }
  }
}
