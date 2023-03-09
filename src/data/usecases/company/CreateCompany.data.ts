import { InternalError } from '../../../domain/errors';
import { iCreateCompanyUsecase } from '../../../domain/usecases/company/iCreateCompany.usecase';
import { iCompanyRepository } from '../../../infra/database/contracts/repositorys/iCompany.repository';

export class CreateCompanyData implements iCreateCompanyUsecase {
  constructor(private readonly companyRepository: iCompanyRepository) {}

  async exec(
    input: iCreateCompanyUsecase.Input,
    settings?: iCreateCompanyUsecase.Settings
  ): Promise<iCreateCompanyUsecase.Output> {
    const session = settings && settings.session ? settings.session : null;

    const company = input;

    if (!company) return;

    if (company && !company.owner)
      throw new InternalError('Onwer for company is required.');

    const result = await this.companyRepository.create(company, { session });
    if (!result || !result.company_id) return null;

    return { company_id: result?.company_id };
  }
}
