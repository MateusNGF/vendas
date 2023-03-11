import { UserEntity } from '../../../domain/entities';
import { BadRequestError } from '../../../domain/errors';
import {
  iCreateAuthenticationUsecase,
  iCreateTokenAuthenticateUsecase,
} from '../../../domain/usecases/authenticate';
import { iCreateAccountUserUsecase } from '../../../domain/usecases/user';
import { iUserRepository } from '../../../infra/database/contracts/repositorys/iUser.repository';
import { iCreateCompanyUsecase } from '../../../domain/usecases/company/iCreateCompany.usecase';
import { CompanyEntity } from '../../../domain/entities/company.entity';

export class CreateAccountUserData implements iCreateAccountUserUsecase {
  constructor(
    private readonly userRepository: iUserRepository,
    private readonly createAuthentication: iCreateAuthenticationUsecase,
    private readonly createTokenAuthenticate: iCreateTokenAuthenticateUsecase,
    private readonly createCompanyUsecase: iCreateCompanyUsecase
  ) { }
  async exec(
    input: iCreateAccountUserUsecase.Input,
    settings ?: iCreateAccountUserUsecase.Settings
  ): Promise<string> {
    const session = settings && settings.session ? settings.session : null;

    const userPartial = this.userRepository.makePartial({
      name: input.name,
    });

    const authenticate = await this.createAuthentication.exec({
      email: input.email,
      password: input.password,
      associeted_id: userPartial.id,
    }, { session });

    if (!authenticate)
      throw new BadRequestError('Unable to create an authenticator.');

    const new_company = await this.createCompanyUsecase.exec(
      new CompanyEntity({ owner: userPartial.id }),
      { session }
    );

    if (!new_company) 
      throw new BadRequestError('Create company failed.');

    const user = new UserEntity({
      id: userPartial.id,
      name: userPartial.name,
      company_id: new_company.company_id,
    });

    const inserteded = await this.userRepository.create(user, { session });
    if (!inserteded || !inserteded.id)
      throw new BadRequestError('Operation failed, please try again.');

    const token = await this.createTokenAuthenticate.exec({
      associeted_id: inserteded.id
    }, { session });

    if (!token) 
      throw new BadRequestError('Token creation failed.');
    
    return token;
  }
}
