import { iController } from '../../contracts';
import { HttpRequest, HttpResponse } from 'src/application/helpers/http';
import { iCreateTransactionUsecase } from 'src/domain/usecases/transaction/iCreateTransaction.usecase';
import { OperationFailed } from '../../../domain/errors';

export class CreateTransactionController extends iController {
  constructor(private readonly createTransactionUsecase: iCreateTransactionUsecase) {
    super();
  }

  async exec(request: HttpRequest): Promise<HttpResponse> {
    try {
      const content: iCreateTransactionUsecase.Input = request.body;

      const transactionPartialData = await this.createTransactionUsecase.exec({
        type: content.type,
        user_id: request.headers.decodedTokenUser.user_id,
        products: content.products,
      });

      if (!transactionPartialData) {
        throw new OperationFailed('Operation failed, try later.');
      }

      return this.sendSucess(200, {
        transaction_id: transactionPartialData.id,
      });
    } catch (e) {
      return this.sendError(e);
    }
  }
}
