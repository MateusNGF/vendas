import { UserEntity } from '../../../domain/entities';
import { OperationFailed } from '../../../domain/errors';
import {
  iCreateAuthenticationUsecase,
  iCreateTokenAuthenticateUsecase,
} from 'src/domain/usecases/authenticate';
import { iCreateAccountUserUsecase } from 'src/domain/usecases/user';
import { iUserRepository } from 'src/infra/database/contracts/repositorys/iUser.repository';

export class CreateAccountUserData implements iCreateAccountUserUsecase {
  constructor(
    private readonly userRepository: iUserRepository,
    private readonly createAuthentication: iCreateAuthenticationUsecase,
    private readonly createTokenAuthenticate: iCreateTokenAuthenticateUsecase
  ) {}
  async exec(input: iCreateAccountUserUsecase.Input): Promise<string> {
    const userPartial = this.userRepository.makePartial({
      name: input.name,
    });

    const authenticate = await this.createAuthentication.exec({
      email: input.email,
      password: input.password,
      associeted_id: userPartial.id,
    });

    if (!authenticate)
      throw new OperationFailed('Unable to create an authenticator.');

    const user = new UserEntity({
      id: userPartial.id,
      name: userPartial.name,
    });

    const inserteded = await this.userRepository.create(user);
    if (!inserteded || (inserteded && !inserteded.id))
      throw new OperationFailed('Operation failed, please try again.');

    const token = await this.createTokenAuthenticate.exec({
      associeted_id: inserteded.id,
    });
    if (!token) throw new OperationFailed('Token creation failed.');
    return token;
  }
}
