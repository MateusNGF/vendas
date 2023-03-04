import { iController } from '../../../application/contracts';
import { HttpRequest, HttpResponse } from 'src/application/helpers/http';
import { iAccessAccountUserUsecase } from 'src/domain/usecases/user';
import { ObjectManager } from '../../../domain/utils';

export class AccessAccountUserController extends iController {
  constructor(
    private readonly accessAccountUserUsecase: iAccessAccountUserUsecase
  ) {
    super();
  }

  async exec(request: HttpRequest): Promise<HttpResponse> {
    try {
      const content: iAccessAccountUserUsecase.Input = request.body;

      ObjectManager.hasKeys<iAccessAccountUserUsecase.Input>(
        ['email', 'password'],
        content
      );

      const token = await this.accessAccountUserUsecase.exec({
        email: content.email,
        password: content.password,
      });

      return this.sendSucess(200, { token });
    } catch (e) {
      return this.sendError(e);
    }
  }
}
