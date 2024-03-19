import { iController } from '../../contracts';
import { HttpRequest, HttpResponse } from 'src/application/helpers/http';
import { iSignInAccountUserUsecase } from 'src/domain/usecases/user';
import { ObjectManager } from '../../../domain/utils';
import { NotificationHandlerSignInAccountUser } from '../../../main/factories/main/errors';

export class SignInAccountUserController extends iController {
  constructor(
    private readonly SignInAccountUserUsecase: iSignInAccountUserUsecase
  ) {
    super();
  }

  async exec(request: HttpRequest): Promise<HttpResponse> {
    try {
      const notificationErrorHandler = NotificationHandlerSignInAccountUser();

      const content: iSignInAccountUserUsecase.Input = request.body;

      ObjectManager.hasKeysWithNotification<iSignInAccountUserUsecase.Input>(
        ['email', 'password'],
        content,
        notificationErrorHandler
      );

      notificationErrorHandler.CheckToNextStep();

      const token = await this.SignInAccountUserUsecase.exec({
        email: content.email,
        password: content.password,
      });

      return this.sendSucess(200, { token });
    } catch (e) {
      return this.sendError(e);
    }
  }
}
