import { iController } from '../../../application/contracts';
import { HttpRequest, HttpResponse } from 'src/application/helpers/http';
import { BadRequestError } from '../../../domain/errors';
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
      const content: iRegisterProductUsecase.Input = request.body;
      const currentUser = request.headers.decodedTokenUser.user_id;

      const notificationHandler = NotificationHandlerRegisterProduct();

      ObjectManager.hasKeysWithNotification<iRegisterProductUsecase.Input>(
        ['name', 'sale_price', 'stock'],
        content,
        notificationHandler
      );

      notificationHandler.CheckToNextStep();

      const inserted = await this.registerProductUsecase.exec({
        name: content.name,
        sale_price: content.sale_price,
        stock: content.stock,
        created_by: currentUser,
      });

      if (!inserted || (inserted && !inserted.id)) {
        throw new BadRequestError('Error undefined to the create prodcut.');
      }

      return this.sendSucess(200, inserted);
    } catch (e) {
      return this.sendError(e);
    }
  }
}
