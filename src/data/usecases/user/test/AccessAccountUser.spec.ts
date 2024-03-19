import { mock, MockProxy } from 'jest-mock-extended';
import { OperationFailed } from '../../../../domain/errors';
import { iCreateTokenAuthenticateUsecase } from 'src/domain/usecases/authenticate';
import { iSignInAccountUserUsecase } from 'src/domain/usecases/user';
import { SignInAccountUserData } from '../SignInAccountUser.data';

describe('CreateTokenAuthenticate', () => {
  let sut: iSignInAccountUserUsecase;

  let createTokenAuthenticate: MockProxy<iCreateTokenAuthenticateUsecase>;

  let fakeInputCredentials: iSignInAccountUserUsecase.Input;
  let fakeOutput: iSignInAccountUserUsecase.Output;

  beforeAll(() => {
    createTokenAuthenticate = mock();
  });

  beforeEach(() => {
    sut = new SignInAccountUserData(createTokenAuthenticate);

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
