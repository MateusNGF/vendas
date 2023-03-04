import { iController } from '../../../application/contracts';
import { HttpRequest, HttpResponse } from '../../../application/helpers/http';
import { iListProductUsecase } from '../../../domain/usecases/product';
import { ObjectManager } from '../../../domain/utils';

export class ListProductController extends iController {
  constructor(private readonly listProductUsecase: iListProductUsecase) {
    super();
  }

  async exec(request: HttpRequest): Promise<HttpResponse> {
    try {
      const content: Partial<iListProductUsecase.Input> = request.body;

      const result = await this.listProductUsecase.exec(content);

      return this.sendSucess(200, { products: result });
    } catch (e) {
      return this.sendError(e);
    }
  }
}
