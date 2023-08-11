import { iController } from '../../../application/contracts';
import { HttpRequest, HttpResponse } from 'src/application/helpers/http';
import { iCreateAccountUserUsecase } from 'src/domain/usecases/user';
import { ObjectManager } from '../../../domain/utils';
import { NotificationHandlerCreateAccountUser } from '../../../main/factories/main/errors';

export class CreateAccountUserController extends iController {
  constructor(
    private readonly createAccountUserUsecase: iCreateAccountUserUsecase
  ) {
    super();
  }
  async exec(request: HttpRequest): Promise<HttpResponse> {
    try {
      const notificationErrorHandler = NotificationHandlerCreateAccountUser()

      const incomingData = request.body;
      
      ObjectManager.hasKeysWithNotification<iCreateAccountUserUsecase.Input>(
        ['email', 'name', 'password'],
        incomingData,
        notificationErrorHandler
      );

      notificationErrorHandler.CheckToNextStep();
      
      const userCreated = await this.createAccountUserUsecase.exec({
        email: incomingData.email,
        name: incomingData.name,
        password: incomingData.password,
      });

      return this.sendSucess(200, { token: userCreated });
    } catch (e) {
      return this.sendError(e);
    }
  }
}
