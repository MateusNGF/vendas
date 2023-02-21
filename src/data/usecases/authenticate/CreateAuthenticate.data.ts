import { BadRequestError, InternalError } from "../../../domain/errors/Http.error";
import { iCreateAuthentication, iGetAuthenticateRecord  } from "src/domain/usecases/authenticate";
import { iAuthenticateRepository } from "src/infra/database/contracts/repositorys/iAuthenticate.repository";
import { iHashAdapter } from "src/infra/cryptography/contracts";

export class CreateAuthenticate implements iCreateAuthentication {
    constructor(
        private readonly authenticateRepository : iAuthenticateRepository,
        private readonly getAuthenticateRecord : iGetAuthenticateRecord,
        private readonly hashAdapter : iHashAdapter
    ){}

    async exec(input: iCreateAuthentication.Input): Promise<iCreateAuthentication.Output> {
        if (!input) return;

        const hasRecord = await this.getAuthenticateRecord.exec({ 
            email : input.email
        })

        if (hasRecord) throw new BadRequestError(`Email ${input.email} has record.`)

        const authenticate = await this.authenticateRepository.create({
            email : input.email,
            associeted_id : input.associeted_id,
            password : await this.hashAdapter.encrypt(input.password)
        })

        return authenticate.id
    }
}