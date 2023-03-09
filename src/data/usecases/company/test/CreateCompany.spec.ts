import { mock, MockProxy } from 'jest-mock-extended';
import { iCompanyRepository } from '../../../../infra/database/contracts/repositorys/iCompany.repository';
import { CompanyEntity } from '../../../../domain/entities/company.entity';
import { iCreateCompanyUsecase } from '../../../../domain/usecases/company/iCreateCompany.usecase';
import { CreateCompanyData } from '../CreateCompany.data';

describe('CreateTokenAuthenticate', () => {
  let sut: iCreateCompanyUsecase;

  let companyRepository: MockProxy<iCompanyRepository>;

  let fakeInputCredentials: iCreateCompanyUsecase.Input;
  let fakeOutput: iCreateCompanyUsecase.Output;

  beforeAll(() => {
    companyRepository = mock();
  });

  beforeEach(() => {
    sut = new CreateCompanyData(companyRepository);

    fakeOutput = {
      company_id: 'any_company_id',
    };
    fakeInputCredentials = new CompanyEntity({});
  });

  it('Should return a valid company id when sucess insert.', async () => {
    companyRepository.create.mockResolvedValue(fakeOutput);

    const result = await sut.exec(fakeInputCredentials);
    expect(result).toEqual(fakeOutput);
  });
});
