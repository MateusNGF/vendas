import {
  SignInAccountUserData,
  SignUpAccountUserData,
  GetAccountUserData,
} from '../../../../data/usecases/user';
import {
  iSignInAccountUserUsecase,
  iSignUpAccountUserUsecase,
  iGetAccountUserUsecase,
} from 'src/domain/usecases/user';
import { makeUserRepository } from '../../infra/database/mongo.factory';
import {
  makeCreateAuthenticateUsecase,
  makeCreateTokenAuthenticateUsecase,
} from './authenticate.factory';

export function makeSignUpAccountUserUsecase(): iSignUpAccountUserUsecase {
  return new SignUpAccountUserData(
    makeUserRepository(),
    makeCreateAuthenticateUsecase(),
    makeCreateTokenAuthenticateUsecase()
  );
}

export function makeSignInAccountUserUsecase(): iSignInAccountUserUsecase {
  return new SignInAccountUserData(makeCreateTokenAuthenticateUsecase());
}

export function makeGetAccountUserUsecase(): iGetAccountUserUsecase {
  return new GetAccountUserData(makeUserRepository());
}
