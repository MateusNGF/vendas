import { ObjectManager } from '../../../domain/utils';
import { CompanyEntity } from '../../../domain/entities/company.entity';
import { OperationFailed } from '../../../domain/errors';
import { iRegisterCompanyUsecase } from '../../../domain/usecases/company';
import { iCompanyRepository } from '../../../infra/database/contracts/repositorys/iCompany.repository';
import { INotificationErrorDriver } from '../../../domain/contracts';

export class RegisterCompanyData implements iRegisterCompanyUsecase {
  constructor(private readonly companyRepository: iCompanyRepository, private readonly notificationErrorDriver: INotificationErrorDriver) {}

  async exec(input: iRegisterCompanyUsecase.Input): Promise<Partial<CompanyEntity>> {
    try {
      const { company, created_by } = input;

      console.log(company);

      const notificationError = await this.notificationErrorDriver.create();

      await this.ValidateInputCompany(company, { notificationError });
      notificationError.CheckToNextStep();

      const normalized = new CompanyEntity(
        Object.assign(company, {
          created_by: created_by,
          owner_id: created_by,
          ...company,
        })
      );

      const resultCreate = await this.companyRepository.create(normalized);
      if (!resultCreate || !resultCreate.id) throw new OperationFailed('Operation at register company failed. Try again.');

      console.log({ resultCreate });

      return Object.assign(normalized, { id: resultCreate.id });
    } catch (e) {
      throw e;
    } finally {
    }
  }

  private async ValidateInputCompany(content: Partial<CompanyEntity>, { notificationError }) {
    ObjectManager.hasKeysWithNotification<Partial<CompanyEntity>>(['name'], content, notificationError);
  }
}
