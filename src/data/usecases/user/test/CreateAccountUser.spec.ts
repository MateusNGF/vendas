import { mock, MockProxy } from 'jest-mock-extended';
import { BadRequestError } from '../../../../domain/errors';
import {
  iCreateAuthenticationUsecase,
  iCreateTokenAuthenticateUsecase,
} from '../../../../domain/usecases/authenticate';
import { iCreateAccountUserUsecase } from '../../../../domain/usecases/user';
import { iUserRepository } from '../../../../infra/database/contracts/repositorys/iUser.repository';
import { CreateAccountUserData } from '../CreateAccountUser.data';
import { UserEntity } from '../../../../domain/entities';
import { iCreateCompanyUsecase } from '../../../../domain/usecases/company/iCreateCompany.usecase';

describe('CreateTokenAuthenticate', () => {
  let sut: iCreateAccountUserUsecase;

  let userRepository: MockProxy<iUserRepository>;
  let createAuthenticate: MockProxy<iCreateAuthenticationUsecase>;
  let createTokenAuthenticate: MockProxy<iCreateTokenAuthenticateUsecase>;
  let createCompanyUsecase: MockProxy<iCreateCompanyUsecase>;


  let fakeInputCredentials: iCreateAccountUserUsecase.Input;
  let fakeOutput: iCreateAccountUserUsecase.Output;
  let userPartial: Partial<UserEntity>;

  beforeAll(() => {
    userRepository = mock();
    createAuthenticate = mock();
    createTokenAuthenticate = mock();
    createCompanyUsecase = mock();
  });

  beforeEach(() => {
    sut = new CreateAccountUserData(
      userRepository,
      createAuthenticate,
      createTokenAuthenticate,
      createCompanyUsecase
    );

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

  it('Should return BadRequestError if create authenticate return null.', async () => {
    userRepository.makePartial.mockReturnValue(userPartial);
    createAuthenticate.exec.mockResolvedValue(null);

    const result = sut.exec(fakeInputCredentials);
    await expect(result).rejects.toThrow(BadRequestError);
  });

  it('Should return BadRequestError when create user return null.', async () => {
    userRepository.makePartial.mockReturnValue(userPartial);
    createAuthenticate.exec.mockResolvedValue({ id: 'authenticate_id' });
    userRepository.create.mockResolvedValue(null);

    const result = sut.exec(fakeInputCredentials);
    await expect(result).rejects.toThrow(BadRequestError);
  });
  it('Should return BadRequestError when create token return null.', async () => {
    userRepository.makePartial.mockReturnValue(userPartial);
    createAuthenticate.exec.mockResolvedValue({ id: 'authenticate_id' });
    userRepository.create.mockResolvedValue({ id: 'user_id' });
    createTokenAuthenticate.exec.mockResolvedValue(null);

    const result = sut.exec(fakeInputCredentials);
    await expect(result).rejects.toThrow(BadRequestError);
  });

  it('Should return valid token when operation completed.', async () => {
    const tokenValid = 'token_valid';

    userRepository.makePartial.mockReturnValue(userPartial);
    createAuthenticate.exec.mockResolvedValue({ id: 'authenticate_id' });
    userRepository.create.mockResolvedValue({ id: 'user_id' });
    createTokenAuthenticate.exec.mockResolvedValue(tokenValid);
    createCompanyUsecase.exec.mockResolvedValue({ company_id : "123" })

    const result = await sut.exec(fakeInputCredentials);
    expect(result).toEqual(tokenValid);
  });

  it('Should return BadRequestError when create company return null.', async () => {
    const tokenValid = 'token_valid';

    userRepository.makePartial.mockReturnValue(userPartial);
    createAuthenticate.exec.mockResolvedValue({ id: 'authenticate_id' });
    userRepository.create.mockResolvedValue({ id: 'user_id' });
    createTokenAuthenticate.exec.mockResolvedValue(tokenValid);
    createCompanyUsecase.exec.mockResolvedValue(null)

    const result = sut.exec(fakeInputCredentials);
    await expect(result).rejects.toThrowError(BadRequestError)
  });
});
