import { iController } from '../../contracts';
import { HttpRequest, HttpResponse } from 'src/application/helpers/http';
import { TransactionEntity } from 'src/domain/entities/transaction.entity';
import { iCreateIncomingTransactionForProductsUsecase } from 'src/domain/usecases/transaction/iCreateTransaction.usecase';
import { ObjectManager } from '../../../domain/utils';
import { BadRequestError } from '../../../domain/errors';
import { iDatabase } from 'src/infra/database/contracts';

export class CreateTransactionController extends iController {
  constructor(
    private readonly sessionDatabse: iDatabase.iSession,
    private readonly createTransactionUsecase: iCreateIncomingTransactionForProductsUsecase
  ) {
    super();
  }

  async exec(request: HttpRequest): Promise<HttpResponse> {
    const session = this.sessionDatabse;

    try {
      session.startTransaction();

      const request_to_issue: iCreateIncomingTransactionForProductsUsecase.Input = {
        buyer_id : request.headers.decodedTokenUser.user_id,
        products_sold : request?.body?.products_sold
      };

      ObjectManager.hasKeys<iCreateIncomingTransactionForProductsUsecase.Input>(
        ['products_sold'], request_to_issue
      );

      if (request_to_issue.products_sold.length < 1)
        throw new BadRequestError('Need one or more products for creating transaction.');

      ObjectManager.hasKeys<TransactionEntity.ProductContentTransaction>(
        ['id', 'quantity'], request_to_issue.products_sold
      );

      const transactionPartialData = await this.createTransactionUsecase.exec(request_to_issue, { session });

      if (!transactionPartialData)
        throw new BadRequestError("It was not possible to create this transaction, try again.")

      await session.commitTransaction();
      return this.sendSucess(200, { id: transactionPartialData.id });
    } catch (e) {
      await session.abortTransaction()
      return this.sendError(e);
    } finally {
      await session.endSession()
    }
  }
}
