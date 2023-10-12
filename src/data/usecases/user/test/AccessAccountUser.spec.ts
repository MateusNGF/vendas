import { mock, MockProxy } from 'jest-mock-extended';
import { OperationFailed } from '../../../../domain/errors';
import { iCreateTokenAuthenticateUsecase } from 'src/domain/usecases/authenticate';
import { iAccessAccountUserUsecase } from 'src/domain/usecases/user';
import { AccessAccountUserData } from '../AccessAccountUser.data';

describe('CreateTokenAuthenticate', () => {
  let sut: iAccessAccountUserUsecase;

  let createTokenAuthenticate: MockProxy<iCreateTokenAuthenticateUsecase>;

  let fakeInputCredentials: iAccessAccountUserUsecase.Input;
  let fakeOutput: iAccessAccountUserUsecase.Output;

  beforeAll(() => {
    createTokenAuthenticate = mock();
  });

  beforeEach(() => {
    sut = new AccessAccountUserData(createTokenAuthenticate);

    fakeOutput = 'token_qualquer';
    fakeInputCredentials = {
      email: 'email_valid@gmail.com',
      password: '123456',
    };
  });

  it('Should return OperationFailed if authenticate not found.', async () => {
    createTokenAuthenticate.exec.mockResolvedValue(null);

    const result = sut.exec(fakeInputCredentials);
    await expect(result).rejects.toThrow(OperationFailed);
  });

  it('Should return valid token when email and password is valid.', async () => {
    createTokenAuthenticate.exec.mockResolvedValue(fakeOutput);

    const result = await sut.exec(fakeInputCredentials);
    expect(result).toEqual(fakeOutput);
  });
});
