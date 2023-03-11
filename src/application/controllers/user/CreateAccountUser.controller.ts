import { iController } from '../../../application/contracts';
import { HttpRequest, HttpResponse } from 'src/application/helpers/http';
import { iCreateAccountUserUsecase } from 'src/domain/usecases/user';
import { ObjectManager } from '../../../domain/utils';
import { iDatabase } from 'src/infra/database/contracts';

export class CreateAccountUserController extends iController {
  constructor(
    private readonly sessionDatabase : iDatabase.iSession,
    private readonly createAccountUserUsecase: iCreateAccountUserUsecase
  ) {
    super();
  }
  async exec(request: HttpRequest): Promise<HttpResponse> {
    const sessionDriver = this.sessionDatabase;
    const session = sessionDriver.startSession();
    
    try {
      const incomingData = request.body;
      ObjectManager.hasKeys<iCreateAccountUserUsecase.Input>(
        ['email', 'name', 'password'],
        incomingData
      );

      session.startTransaction();

      const userCreated = await this.createAccountUserUsecase.exec({
        email: incomingData.email,
        name: incomingData.name,
        password: incomingData.password,
      }, { session });

      await session.commitTransaction();
      return this.sendSucess(200, { token: userCreated });
    } catch (e) {
      await session.abortTransaction();
      return this.sendError(e);
    }finally{
      await session.endSession()
    }
  }
}
