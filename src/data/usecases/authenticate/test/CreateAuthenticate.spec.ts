import { mock, MockProxy } from 'jest-mock-extended';
import { AuthEntity } from 'src/domain/entities/auth.entity';
import { BadRequestError } from '../../../../domain/errors/Http.error';
import {
  iCreateAuthenticationUsecase,
  iGetAuthenticateRecordUsecase,
} from 'src/domain/usecases/authenticate';
import { iAuthenticateRepository } from 'src/infra/database/contracts/repositorys/iAuthenticate.repository';
import { CreateAuthenticateData } from '../CreateAuthenticate.data';
import { iHashAdapter } from 'src/infra/cryptography/contracts';

describe('CreateTokenAuthenticate', () => {
  let sut: iCreateAuthenticationUsecase;

  let authenticateRepository: MockProxy<iAuthenticateRepository>;
  let getAuthenticateRecord: MockProxy<iGetAuthenticateRecordUsecase>;
  let hashAdapter: MockProxy<iHashAdapter>;

  let fakeInputCredentials: iCreateAuthenticationUsecase.Input;
  let fakeOutput: iCreateAuthenticationUsecase.Output;
  let fakeAuth: AuthEntity;

  beforeAll(() => {
    authenticateRepository = mock();
    getAuthenticateRecord = mock();
    hashAdapter = mock();
  });

  beforeEach(() => {
    sut = new CreateAuthenticateData(
      authenticateRepository,
      getAuthenticateRecord,
      hashAdapter
    );

    fakeOutput = {
      id: 'id_any',
    };
    fakeInputCredentials = {
      associeted_id: '123',
      email: 'email_valid@gmail.com',
      password: '123456',
    };

    fakeAuth = fakeInputCredentials;
  });

  it('Should return BadRequestError if email of authenticate has record.', async () => {
    getAuthenticateRecord.exec.mockResolvedValue(fakeAuth);

    const result = sut.exec(fakeInputCredentials);
    await expect(result).rejects.toThrow(BadRequestError);
  });

  it('Should return new authenticate id if email has valid.', async () => {
    getAuthenticateRecord.exec.mockResolvedValue(null);
    hashAdapter.encrypt.mockResolvedValue('string_encripted');
    authenticateRepository.create.mockResolvedValue({ id: fakeOutput.id });

    const result = await sut.exec(fakeInputCredentials);
    expect(result).toEqual(expect.objectContaining(fakeOutput));
  });
});
