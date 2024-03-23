import { mock, MockProxy } from 'jest-mock-extended';
import { OperationFailed } from '../../../../domain/errors';
import { iCreateAuthenticationUsecase, iCreateTokenAuthenticateUsecase } from 'src/domain/usecases/authenticate';
import { iSignUpAccountUserUsecase } from 'src/domain/usecases/user';
import { iUserRepository } from 'src/infra/database/contracts/repositorys/iUser.repository';
import { SignUpAccountUserData } from '../SignUpAccountUser.data';
import { UserEntity } from 'src/domain/entities';

describe('CreateTokenAuthenticate', () => {
  let sut: iSignUpAccountUserUsecase;

  let userRepository: MockProxy<iUserRepository>;
  let createAuthenticate: MockProxy<iCreateAuthenticationUsecase>;
  let createTokenAuthenticate: MockProxy<iCreateTokenAuthenticateUsecase>;

  let fakeInputCredentials: iSignUpAccountUserUsecase.Input;
  let fakeOutput: iSignUpAccountUserUsecase.Output;
  let userPartial: Partial<UserEntity>;

  beforeAll(() => {
    userRepository = mock();
    createAuthenticate = mock();
    createTokenAuthenticate = mock();
  });

  beforeEach(() => {
    sut = new SignUpAccountUserData(userRepository, createAuthenticate, createTokenAuthenticate);

    fakeOutput = 'tokken_qualquer';
    fakeInputCredentials = {
      email: 'email_valid@gmail.com',
      password: '123456',
      name: 'Severino',
    };
    userPartial = {
      id: 'id_any',
      name: fakeInputCredentials.name,
    };
  });

  it('Should return OperationFailed if create authenticate return null.', async () => {
    userRepository.makePartial.mockReturnValue(userPartial);
    createAuthenticate.exec.mockResolvedValue(null);

    const result = sut.exec(fakeInputCredentials);
    await expect(result).rejects.toThrow(OperationFailed);
  });

  it('Should return OperationFailed when create user return null.', async () => {
    userRepository.makePartial.mockReturnValue(userPartial);
    createAuthenticate.exec.mockResolvedValue({ id: 'authenticate_id' });
    userRepository.create.mockResolvedValue(null);

    const result = sut.exec(fakeInputCredentials);
    await expect(result).rejects.toThrow(OperationFailed);
  });
  it('Should return OperationFailed when create token return null.', async () => {
    userRepository.makePartial.mockReturnValue(userPartial);
    createAuthenticate.exec.mockResolvedValue({ id: 'authenticate_id' });
    userRepository.create.mockResolvedValue({ id: 'user_id' });
    createTokenAuthenticate.exec.mockResolvedValue(null);

    const result = sut.exec(fakeInputCredentials);
    await expect(result).rejects.toThrow(OperationFailed);
  });

  it('Should return valid token when operation completed.', async () => {
    const tokenValid = 'token_valid';

    userRepository.makePartial.mockReturnValue(userPartial);
    createAuthenticate.exec.mockResolvedValue({ id: 'authenticate_id' });
    userRepository.create.mockResolvedValue({ id: 'user_id' });
    createTokenAuthenticate.exec.mockResolvedValue(tokenValid);

    const result = await sut.exec(fakeInputCredentials);
    expect(result).toEqual(tokenValid);
  });
});
