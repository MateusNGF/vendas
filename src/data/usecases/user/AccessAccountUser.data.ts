import { BadRequestError } from '../../../domain/errors';
import { iCreateTokenAuthenticateUsecase } from 'src/domain/usecases/authenticate';
import { iAccessAccountUserUsecase } from 'src/domain/usecases/user';

export class AccessAccountUserData implements iAccessAccountUserUsecase {
  constructor(
    private readonly createTokenAuthenticate: iCreateTokenAuthenticateUsecase
  ) {}
  async exec(input: iAccessAccountUserUsecase.Input): Promise<string> {
    const token = await this.createTokenAuthenticate.exec({
      email: input.email,
      password: input.password,
    });

    if (!token) throw new BadRequestError('Account not found.');

    return token;
  }
}
