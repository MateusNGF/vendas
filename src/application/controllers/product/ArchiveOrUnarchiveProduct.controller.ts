import { iController } from '../../../application/contracts';
import { HttpRequest, HttpResponse } from 'src/application/helpers/http';
import { iArchiveOrUnarchiveProductUsecase } from 'src/domain/usecases/product';
import { ObjectManager } from '../../../domain/utils';

export class ArchiveOrUnarchiveProductController extends iController {
  constructor(
    private readonly archiveOrUnarchiveProduct: iArchiveOrUnarchiveProductUsecase
  ) {
    super();
  }
  async exec(request: HttpRequest): Promise<HttpResponse> {
    try {
      const content: iArchiveOrUnarchiveProductUsecase.Input = {
        action: request.params.action,
        product_id: request.params.productId,
      };

      ObjectManager.hasKeys<iArchiveOrUnarchiveProductUsecase.Input>(
        ['action', 'product_id'],
        content
      );

      const result = await this.archiveOrUnarchiveProduct.exec(content);

      return this.sendSucess(200, {
        [content.action]: result,
      });
    } catch (e) {
      return this.sendError(e);
    }
  }
}
