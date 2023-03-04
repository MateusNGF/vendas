import { iGetAuthenticateRecordUsecase } from 'src/domain/usecases/authenticate';
import { iAuthenticateRepository } from 'src/infra/database/contracts/repositorys/iAuthenticate.repository';

export class GetAuthenticateRecordData
  implements iGetAuthenticateRecordUsecase
{
  constructor(
    private readonly authenticateRepository: iAuthenticateRepository
  ) {}
  async exec(
    input: iGetAuthenticateRecordUsecase.Input
  ): Promise<iGetAuthenticateRecordUsecase.Output> {
    if (input.email)
      return await this.authenticateRepository.findByEmail(input.email);
    else if (input.associeted_id)
      return await this.authenticateRepository.findByAssocieted(
        input.associeted_id
      );
    else if (input.id)
      return await this.authenticateRepository.findById(input.id);
    else return null;
  }
}
