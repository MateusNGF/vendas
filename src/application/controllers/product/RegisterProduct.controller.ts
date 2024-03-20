import { iController } from '../../../application/contracts';
import { HttpRequest, HttpResponse } from 'src/application/helpers/http';
import { BadRequestError, OperationFailed } from '../../../domain/errors';
import { iRegisterProductUsecase } from 'src/domain/usecases/product';
import { ObjectManager } from '../../../domain/utils';
import { NotificationHandlerRegisterProduct } from '../../../main/factories/main/errors';

export class RegisterProductController extends iController {
  constructor(
    private readonly registerProductUsecase: iRegisterProductUsecase
  ) {
    super();
  }
  async exec(request: HttpRequest): Promise<HttpResponse> {
    try {
      if (!Array.isArray(request.body)) {
        throw new OperationFailed('body need be an array of products.');
      }

      const content: Array<iRegisterProductUsecase.ProductContent> = request.body;
      const currentUser = request.headers.decodedTokenUser.user_id;
      
      const contentProductsAndTransaction =
        await this.registerProductUsecase.exec(
          {
            user_id: currentUser,
            products: content.map((product) => ({
              name: product.name,
              sale_price: product.sale_price,
              stock: product.stock,
            })),
          },
          { createTransaction: true }
        );

      return this.sendSucess(200, contentProductsAndTransaction);
    } catch (e) {
      return this.sendError(e);
    }
  }
}
