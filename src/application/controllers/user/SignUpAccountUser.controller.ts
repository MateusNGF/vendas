import { iController } from '../../contracts';
import { HttpRequest, HttpResponse } from 'src/application/helpers/http';
import { iSignUpAccountUserUsecase } from 'src/domain/usecases/user';
import { ObjectManager } from '../../../domain/utils';
import { NotificationHandlerSignUpAccountUser } from '../../../main/factories/main/errors';
import { INotificationErrorDriver } from 'src/domain/contracts';

export class SignUpAccountUserController extends iController {
  constructor(
    private readonly SignUpAccountUserUsecase: iSignUpAccountUserUsecase,
    private readonly NotificationErrorDriver: INotificationErrorDriver
  ) {
    super();
  }
  async exec(request: HttpRequest): Promise<HttpResponse> {
    try {
      const notificationError = await this.NotificationErrorDriver.create()

      const incomingData = request.body;

      ObjectManager.hasKeysWithNotification<iSignUpAccountUserUsecase.Input>(
        ['email', 'name', 'password'],
        incomingData,
        notificationError
      );

      notificationError.CheckToNextStep();

      const userCreated = await this.SignUpAccountUserUsecase.exec({
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
