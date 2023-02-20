import { mock, MockProxy } from "jest-mock-extended";
import { AuthEntity } from "src/domain/entities/auth.entity";
import { BadRequestError } from "../../../../domain/errors/Http.error";
import { iCreateAuthentication, iHasAuthenticateRecord } from "src/domain/usecases/authenticate";
import { iAuthenticateRepository } from "src/infra/database/contracts/repositorys/iAuthenticate.repository";
import { CreateAuthenticate } from "../CreateAuthenticate.data";

describe('CreateTokenAuthenticate', () => {
    let sut: iCreateAuthentication;

    let authenticateRepository: MockProxy<iAuthenticateRepository>;
    let hasAuthenticateRecord: MockProxy<iHasAuthenticateRecord>;

    let fakeInputCredentials: iCreateAuthentication.Input;
    let fakeOutput: iCreateAuthentication.Output;
    let fakeAuth: AuthEntity

    beforeAll(() => {
        authenticateRepository = mock();
        hasAuthenticateRecord = mock();
    });

    beforeEach(() => {
        sut = new CreateAuthenticate(authenticateRepository, hasAuthenticateRecord);

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
        hasAuthenticateRecord.exec.mockResolvedValue(fakeOutput);

        const result = sut.exec(fakeInputCredentials);
        await expect(result).rejects.toThrow(BadRequestError);
    });

    it('Should return new authenticate id if email has valid.', async () => {
        hasAuthenticateRecord.exec.mockResolvedValue(null);
        authenticateRepository.create.mockResolvedValue(fakeAuth)

        const result = await sut.exec(fakeInputCredentials);
        expect(result).toEqual(fakeAuth.id);
    });
});