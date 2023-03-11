import {
  BadRequestError,
  InternalError,
} from '../../../domain/errors/Http.error';
import {
  iCreateAuthenticationUsecase,
  iGetAuthenticateRecordUsecase,
} from 'src/domain/usecases/authenticate';
import { iAuthenticateRepository } from 'src/infra/database/contracts/repositorys/iAuthenticate.repository';
import { iHashAdapter } from 'src/infra/cryptography/contracts';
import { AuthEntity } from '../../../domain/entities';

export class CreateAuthenticateData implements iCreateAuthenticationUsecase {
  constructor(
    private readonly authenticateRepository: iAuthenticateRepository,
    private readonly getAuthenticateRecord: iGetAuthenticateRecordUsecase,
    private readonly hashAdapter: iHashAdapter
  ) {}

  async exec(
    input: iCreateAuthenticationUsecase.Input,
    settings: iCreateAuthenticationUsecase.Settings
  ): Promise<iCreateAuthenticationUsecase.Output> {
    const session = settings && settings.session ? settings.session : null;
    
    if (!input) return;

    const hasRecord = await this.getAuthenticateRecord.exec({
      email: input.email,
    });

    if (hasRecord)
      throw new BadRequestError(`Email ${input.email} has record.`);

    const incomingAuthenticate = new AuthEntity({
      email: input.email,
      associeted_id: input.associeted_id,
      password: await this.hashAdapter.encrypt(input.password),
    });

    const authenticate = await this.authenticateRepository.create(incomingAuthenticate, { session });
    if (!authenticate) return null;

    return {
      id: authenticate.id,
    };
  }
}
