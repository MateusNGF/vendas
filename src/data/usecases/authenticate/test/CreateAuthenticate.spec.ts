import { mock, MockProxy } from "jest-mock-extended";
import { AuthEntity } from "src/domain/entities/auth.entity";
import { BadRequestError } from "../../../../domain/errors/Http.error";
import { iCreateAuthentication, iGetAuthenticateRecord  } from "src/domain/usecases/authenticate";
import { iAuthenticateRepository } from "src/infra/database/contracts/repositorys/iAuthenticate.repository";
import { CreateAuthenticate } from "../CreateAuthenticate.data";
import { iHashAdapter } from "src/infra/cryptography/contracts";

describe('CreateTokenAuthenticate', () => {
    let sut: iCreateAuthentication;

    let authenticateRepository: MockProxy<iAuthenticateRepository>;
    let getAuthenticateRecord: MockProxy<iGetAuthenticateRecord >;
    let hashAdapter : MockProxy<iHashAdapter>;

    let fakeInputCredentials: iCreateAuthentication.Input;
    let fakeOutput: iCreateAuthentication.Output;
    let fakeAuth: AuthEntity

    beforeAll(() => {
        authenticateRepository = mock();
        getAuthenticateRecord = mock();
        hashAdapter = mock();
    });

    beforeEach(() => {
        sut = new CreateAuthenticate(authenticateRepository, getAuthenticateRecord, hashAdapter);

        fakeOutput = {
            token: "token_valid"
        }
        fakeInputCredentials = {
            associeted_id: '123',
            email: 'email_valid@gmail.com',
            password: '123456'
        };

        fakeAuth = fakeInputCredentials
    });

    it('Should return BadRequestError if email of authenticate has record.', async () => {
        getAuthenticateRecord.exec.mockResolvedValue(fakeAuth);

        const result = sut.exec(fakeInputCredentials);
        await expect(result).rejects.toThrow(BadRequestError);
    });

    it('Should return new authenticate id if email has valid.', async () => {
        getAuthenticateRecord.exec.mockResolvedValue(null);
        hashAdapter.encrypt.mockResolvedValue('string_encripted')
        authenticateRepository.create.mockResolvedValue(fakeAuth)

        const result = await sut.exec(fakeInputCredentials);
        expect(result).toEqual(fakeAuth.id);
    });
});