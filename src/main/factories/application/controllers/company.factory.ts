import { iController } from '../../../../application/contracts';
import { RegisterCompanyController } from '../../../../application/controllers/company/RegisterCompany.controller';
import { makeRegisterCompanyUsecase } from '../usecases/company.factory';

export function makeRegisterCompanyController(): iController {
  return new RegisterCompanyController(makeRegisterCompanyUsecase());
}
