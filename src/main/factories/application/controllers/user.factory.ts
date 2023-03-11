import { iController } from '../../../../application/contracts';
import { GetAccountUserController } from '../../../../application/controllers/user/GetAccountUser.controller';
import {
  AccessAccountUserController,
  CreateAccountUserController,
} from '../../../../application/controllers/user';
import {
  makeAccessAccountUserUsecase,
  makeCreateAccountUserUsecase,
  makeGetAccountUserUsecase,
} from '../usecases/user.factory';
import { makeSessionDatabase } from '../../infra/database/mongo.factory';

export function makeCreateAccountUserController(): iController {
  return new CreateAccountUserController(
    makeSessionDatabase(),
    makeCreateAccountUserUsecase()
  );
}

export function makeAccessAccountUserController(): iController {
  return new AccessAccountUserController(makeAccessAccountUserUsecase());
}

export function makeGetAccountUserController(): iController {
  return new GetAccountUserController(makeGetAccountUserUsecase());
}
