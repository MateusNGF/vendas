import { MockProxy, mock } from 'jest-mock-extended';
import { iRegisterCompanyUsecase } from 'src/domain/usecases/company';
import { RegisterCompanyData } from '../RegisterCompany.data';
import { iCompanyRepository } from '../../../../infra/database/contracts/repositorys/iCompany.repository';
import { OperationFailed } from '../../../../domain/errors';

describe('RegisterCompanyUsecase', () => {
  let sut: iRegisterCompanyUsecase;
  let companyRepository: MockProxy<iCompanyRepository>;

  let fakeInputCredentials: iRegisterCompanyUsecase.Input;
  let expectedOutput: iRegisterCompanyUsecase.Output;

  beforeAll(() => {
    companyRepository = mock();
  });

  beforeEach(() => {
    sut = new RegisterCompanyData(
      companyRepository,
      null as any
    );

    fakeInputCredentials = {
      created_by: 'any_created_by',
      company : {
        name: 'any_name',
        fantasy_name: 'any_fantasy_name',
        created_at: new Date(),
      }
    };
    expectedOutput = {
        id: 'any_id',
        ...fakeInputCredentials.company
    };
  });

  beforeEach(() => {
    companyRepository.create.mockResolvedValue({ id: 'any_id' });
  })

  it('Should return company with same information from input', async () => {
    const result = await sut.exec(fakeInputCredentials);
    expect(result).toEqual(
        expect.objectContaining<iRegisterCompanyUsecase.Output>({ 
          ...fakeInputCredentials.company
        })
    );
  });

  it('Should return company associeted owner_id and created_by from created_by', async () => {
    const result = await sut.exec(fakeInputCredentials);
    expect(result).toEqual(
        expect.objectContaining<iRegisterCompanyUsecase.Output>({ 
          created_by: fakeInputCredentials.created_by,
          owner_id: fakeInputCredentials.created_by
        })
    );
  });

  it('Should return company with id', async () => {
    const result = await sut.exec(fakeInputCredentials);
    expect(result).toHaveProperty("id");
  });

  
  it('Should return OperationFailed when create company return failed.', async () => {
    companyRepository.create.mockResolvedValue(null);

    const result = sut.exec(fakeInputCredentials);
    await expect(result).rejects.toThrow(OperationFailed);
  });
});
