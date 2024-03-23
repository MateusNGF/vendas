import { iGetAccountUserUsecase } from 'src/domain/usecases/user';
import { iUserRepository } from 'src/infra/database/contracts/repositorys/iUser.repository';

export class GetAccountUserData implements iGetAccountUserUsecase {
  constructor(private readonly userRepository: iUserRepository) {}

  exec(input: iGetAccountUserUsecase.Input): Promise<iGetAccountUserUsecase.Output> {
    return this.userRepository.getComplete(input);
  }
}
