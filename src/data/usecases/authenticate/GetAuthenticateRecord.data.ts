import { iGetAuthenticateRecordUsecase } from 'src/domain/usecases/authenticate';
import { iAuthenticateRepository } from 'src/infra/database/contracts/repositorys/iAuthenticate.repository';

export class GetAuthenticateRecordData
  implements iGetAuthenticateRecordUsecase
{
  constructor(
    private readonly authenticateRepository: iAuthenticateRepository
  ) {}
  async exec(
    input: iGetAuthenticateRecordUsecase.Input,
    settings ?: iGetAuthenticateRecordUsecase.Settings
  ): Promise<iGetAuthenticateRecordUsecase.Output> {
    const session = settings && settings.session ? settings.session : null;

    if (input.email) {
      return await this.authenticateRepository.findByEmail(input.email, { session });
    }

    if (input.associeted_id) {
      return await this.authenticateRepository.findByAssocieted(input.associeted_id, { session });
    }

    if (input.id) {
      return await this.authenticateRepository.findById(input.id, { session });
    }

    return null;
  }
}
