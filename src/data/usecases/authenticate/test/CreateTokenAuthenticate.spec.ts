import {mock, MockProxy} from 'jest-mock-extended'
import { AuthEntity } from 'src/domain/entities/auth.entity';
import { iCreateTokenAuthenticate } from 'src/domain/usecases/authenticate';
import { iTokenAdapter } from 'src/infra/cryptography/contracts';
import { iAuthenticateRepository } from "src/infra/database/contracts/repositorys/iAuthenticate.repository";
import { CreateTokenAuthenticate } from '../CreateTokenAuthenticate.data';


describe('CreateTokenAuthenticate', () => {
  let sut: iCreateTokenAuthenticate;

  let authenticateRepository: MockProxy<iAuthenticateRepository>;
  let tokenAdapter : MockProxy<iTokenAdapter>

  let fakeInputCredentials: iCreateTokenAuthenticate.Input;
  let fakeOutput: iCreateTokenAuthenticate.Output;
  let fakeAuth : AuthEntity

  beforeAll(() => {
    authenticateRepository = mock();
    tokenAdapter = mock();
  });

  beforeEach(() => {
    sut = new CreateTokenAuthenticate(authenticateRepository, tokenAdapter);
    
    fakeOutput = "token_valid"
    fakeInputCredentials = {
      associeted_id : '123',
      id : '123455'
    };
    fakeAuth = {
        associeted_id : '123123',
        email : 'any_email',
        password  : "testeteste"
      }
  });

  it('Should return null if not found authenticate by associeted_id', async () => {
    delete fakeInputCredentials.id;

    authenticateRepository.findByAssocieted.mockResolvedValue(null);

    const result = await sut.exec(fakeInputCredentials);
    expect(result).toEqual(null);
  });

  it('Should return null if not found authenticate by id', async () => {
    delete fakeInputCredentials.associeted_id;

    authenticateRepository.findById.mockResolvedValue(null);

    const result = await sut.exec(fakeInputCredentials);
    expect(result).toEqual(null);
  });

  it('Should return valid token if found authenticate by associeted_id', async () => {
    delete fakeInputCredentials.id;

    authenticateRepository.findByAssocieted.mockResolvedValue(fakeAuth);
    tokenAdapter.sing.mockResolvedValue("token_valid")

    const result = await sut.exec(fakeInputCredentials);
    expect(result).toEqual("token_valid");
  });

  it('Should return valid token if found authenticate by id', async () => {
    delete fakeInputCredentials.associeted_id;

    authenticateRepository.findById.mockResolvedValue(fakeAuth);
    tokenAdapter.sing.mockResolvedValue("token_valid")

    const result = await sut.exec(fakeInputCredentials);
    expect(result).toEqual("token_valid");
  });
});