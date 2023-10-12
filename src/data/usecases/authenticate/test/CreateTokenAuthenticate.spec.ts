import {
  iCreateTokenAuthenticateUsecase,
  iGetAuthenticateRecordUsecase,
} from 'src/domain/usecases/authenticate';
import { mock, MockProxy } from 'jest-mock-extended';
import { AuthEntity } from 'src/domain/entities/auth.entity';
import { OperationFailed, UnauthorizedError } from '../../../../domain/errors';
import { iHashAdapter, iTokenAdapter } from 'src/infra/cryptography/contracts';
import { CreateTokenAuthenticateData } from '../CreateTokenAuthenticate.data';

describe('CreateTokenAuthenticate', () => {
  let sut: iCreateTokenAuthenticateUsecase;

  let tokenAdapter: MockProxy<iTokenAdapter>;
  let getAuthenticateRecord: MockProxy<iGetAuthenticateRecordUsecase>;
  let hashAdapter: MockProxy<iHashAdapter>;

  let fakeInputCredentials: iCreateTokenAuthenticateUsecase.Input;
  let fakeOutput: iCreateTokenAuthenticateUsecase.Output;
  let fakeAuth: AuthEntity;

  beforeAll(() => {
    tokenAdapter = mock();
    getAuthenticateRecord = mock();
    hashAdapter = mock();
  });

  beforeEach(() => {
    sut = new CreateTokenAuthenticateData(
      tokenAdapter,
      getAuthenticateRecord,
      hashAdapter
    );

    fakeOutput = 'token_valid';
    fakeInputCredentials = {
      email: 'email@email.com',
      associeted_id: '123',
      id: '123455',
    };
    fakeAuth = {
      associeted_id: '123123',
      email: 'any_email',
      password: 'testeteste',
    };
  });

  it('Should return null if not found authenticate by associeted_id', async () => {
    getAuthenticateRecord.exec.mockResolvedValue(null);

    const result = await sut.exec(fakeInputCredentials);
    expect(result).toEqual(null);
  });

  it('Should return null if not found authenticate by id', async () => {
    getAuthenticateRecord.exec.mockResolvedValue(null);

    const result = await sut.exec(fakeInputCredentials);
    expect(result).toEqual(null);
  });

  it('Should return valid token if found authenticate by associeted_id', async () => {
    const token = 'token_valid';

    getAuthenticateRecord.exec.mockResolvedValue(fakeAuth);
    tokenAdapter.sing.mockResolvedValue(token);

    const result = await sut.exec(fakeInputCredentials);
    expect(result).toEqual(token);
  });

  it('Should return valid token if found authenticate by id', async () => {
    const token = 'token_valid';

    getAuthenticateRecord.exec.mockResolvedValue(fakeAuth);
    tokenAdapter.sing.mockResolvedValue(token);

    const result = await sut.exec(fakeInputCredentials);
    expect(result).toEqual(token);
  });

  it('Should return OperationFailed if password not match.', async () => {
    fakeInputCredentials.password = 'senha invalida';

    getAuthenticateRecord.exec.mockResolvedValue(fakeAuth);
    hashAdapter.compare.mockResolvedValue(false);

    const result = sut.exec(fakeInputCredentials);
    await expect(result).rejects.toThrow(OperationFailed);
  });

  it('Should return token when password match.', async () => {
    const token = 'token_valid';

    fakeInputCredentials.password = fakeAuth.password;

    getAuthenticateRecord.exec.mockResolvedValue(fakeAuth);
    hashAdapter.compare.mockResolvedValue(true);
    tokenAdapter.sing.mockResolvedValue(token);

    const result = await sut.exec(fakeInputCredentials);
    expect(result).toEqual(token);
  });
});
