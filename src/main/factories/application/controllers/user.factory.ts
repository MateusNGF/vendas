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

export function makeSignUpAccountUserController(): iController {
  return new SignUpAccountUserController(makeSignUpAccountUserUsecase());
}

export function makeSignInAccountUserController(): iController {
  return new SignInAccountUserController(makeSignInAccountUserUsecase());
}

export function makeGetAccountUserController(): iController {
  return new GetAccountUserController(makeGetAccountUserUsecase());
}
