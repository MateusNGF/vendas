import {mock, MockProxy} from 'jest-mock-extended'
import { iGetAuthenticateRecordUsecase } from 'src/domain/usecases/authenticate';
import { iAuthenticateRepository } from "src/infra/database/contracts/repositorys/iAuthenticate.repository";
import { GetAuthenticateRecordData } from '../GetAuthenticateRecord.data';


describe('CreateTokenAuthenticate', () => {
  let sut: iGetAuthenticateRecordUsecase;

  let authenticateRepository: MockProxy<iAuthenticateRepository>;

  let fakeInputCredentials: iGetAuthenticateRecordUsecase.Input;
  let fakeOutput: iGetAuthenticateRecordUsecase.Output;

  beforeAll(() => {
    authenticateRepository = mock();
  });

  beforeEach(() => {
    sut = new GetAuthenticateRecordData(authenticateRepository);
    
    fakeInputCredentials = {}
    fakeOutput = {
        associeted_id : '123123',
        email : 'any_email',
        password  : "testeteste"
      }
  });

  it('Should return null if not found authenticate by associeted_id', async () => {
    fakeInputCredentials.associeted_id = 'any_associeted'

    authenticateRepository.findByAssocieted.mockResolvedValue(null);

    const result = await sut.exec(fakeInputCredentials);
    expect(result).toEqual(null);
  });

  it('Should return autheticate when found authenticate by associeted_id', async () => {
    fakeInputCredentials.associeted_id = 'any_associeted'

    authenticateRepository.findByAssocieted.mockResolvedValue(fakeOutput);

    const result = await sut.exec(fakeInputCredentials);
    expect(result).toEqual(fakeOutput);
  });

  it('Should return null if not found authenticate by associeted_id', async () => {
    fakeInputCredentials.email = 'any_email'
    
    authenticateRepository.findByEmail.mockResolvedValue(null);

    const result = await sut.exec(fakeInputCredentials);
    expect(result).toEqual(null);
  });

  it('Should return autheticate when found authenticate by email', async () => {
    fakeInputCredentials.email = 'any_email'

    authenticateRepository.findByEmail.mockResolvedValue(fakeOutput);

    const result = await sut.exec(fakeInputCredentials);
    expect(result).toEqual(fakeOutput);
  });

  it('Should return null if not found authenticate by id', async () => {
    fakeInputCredentials.id = 'any_id'
    
    authenticateRepository.findById.mockResolvedValue(null);

    const result = await sut.exec(fakeInputCredentials);
    expect(result).toEqual(null);
  });

  it('Should return autheticate when found authenticate by id', async () => {
    fakeInputCredentials.id = 'any_id'

    authenticateRepository.findById.mockResolvedValue(fakeOutput);

    const result = await sut.exec(fakeInputCredentials);
    expect(result).toEqual(fakeOutput);
  });
});