import { BadRequestError, InternalError } from "../../../domain/errors/Http.error";
import { iCreateAuthentication, iHasAuthenticateRecord } from "src/domain/usecases/authenticate";
import { iAuthenticateRepository } from "src/infra/database/contracts/repositorys/iAuthenticate.repository";

export class CreateAuthenticate implements iCreateAuthentication {
    constructor(
        private readonly authenticateRepository : iAuthenticateRepository,
        private readonly hasAuthenticateRecord : iHasAuthenticateRecord
    ){}

    async exec(input: iCreateAuthentication.Input): Promise<iCreateAuthentication.Output> {
        if (!input) return;

        const hasRecord = await this.hasAuthenticateRecord.exec({ 
            email : input.email
        })

        if (hasRecord) throw new BadRequestError(`Email ${input.email} has record.`)

        const authenticate = await this.authenticateRepository.create(input)

        return authenticate.id
    }
}