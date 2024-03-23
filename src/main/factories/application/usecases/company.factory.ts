import { RegisterCompanyData } from '../../../../data/usecases/company/RegisterCompany.data';
import { iRegisterCompanyUsecase } from '../../../../domain/usecases/company';
import { makeCompanyRepository } from '../../infra/database/mongo.factory';
import { NotificationHandlerRegisterCompany } from '../../main/errors';

export function makeRegisterCompanyUsecase(): iRegisterCompanyUsecase {
  return new RegisterCompanyData(makeCompanyRepository(), NotificationHandlerRegisterCompany());
}
