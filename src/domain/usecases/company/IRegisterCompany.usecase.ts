import { iUsecase } from 'src/domain/contracts';
import { CompanyEntity } from 'src/domain/entities/company.entity';

export abstract class iRegisterCompanyUsecase implements iUsecase {
  abstract exec(input: iRegisterCompanyUsecase.Input): Promise<iRegisterCompanyUsecase.Output>;
}

export namespace iRegisterCompanyUsecase {
  export type Input = {
    created_by: string;
    company: Partial<CompanyEntity>;
  };

  export type Output = Partial<CompanyEntity>;
}
