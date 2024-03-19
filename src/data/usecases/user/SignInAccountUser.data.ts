import { OperationFailed } from '../../../domain/errors';
import { iCreateTokenAuthenticateUsecase } from 'src/domain/usecases/authenticate';
import { iSignInAccountUserUsecase } from 'src/domain/usecases/user';

export class SignInAccountUserData implements iSignInAccountUserUsecase {
  constructor(
    private readonly createTokenAuthenticate: iCreateTokenAuthenticateUsecase
  ) {}
  async exec(input: iSignInAccountUserUsecase.Input): Promise<string> {
    const token = await this.createTokenAuthenticate.exec({
      email: input.email,
      password: input.password,
    });

    if (!token) throw new OperationFailed('Account not found.');

    return token;
  }
}
