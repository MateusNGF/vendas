import { iController } from '../../../../application/contracts';
import { GetAccountUserController } from '../../../../application/controllers/user/GetAccountUser.controller';
import {
  SignInAccountUserController,
  SignUpAccountUserController,
} from '../../../../application/controllers/user';
import {
  makeSignInAccountUserUsecase,
  makeSignUpAccountUserUsecase,
  makeGetAccountUserUsecase,
} from '../usecases/user.factory';
import { NotificationHandlerSignInAccountUser } from '../../main/errors';

export function makeSignUpAccountUserController(): iController {
  return new SignUpAccountUserController(
    makeSignUpAccountUserUsecase(),
    NotificationHandlerSignInAccountUser()
  );
}

export function makeSignInAccountUserController(): iController {
  return new SignInAccountUserController(
      makeSignInAccountUserUsecase(),
      NotificationHandlerSignInAccountUser()
    );
}

export function makeGetAccountUserController(): iController {
  return new GetAccountUserController(makeGetAccountUserUsecase());
}
