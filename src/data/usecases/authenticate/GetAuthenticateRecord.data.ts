import { iGetAuthenticateRecord  } from "src/domain/usecases/authenticate";
import { iAuthenticateRepository } from "src/infra/database/contracts/repositorys/iAuthenticate.repository";

export class GetAuthenticateRecord implements iGetAuthenticateRecord {
    constructor(
        private readonly authenticateRepository: iAuthenticateRepository
    ) { }
    async exec(input: iGetAuthenticateRecord.Input): Promise<iGetAuthenticateRecord.Output> {
        if (input.email) 
            return await this.authenticateRepository.findByEmail(input.email)
        else if (input.associeted_id) 
            return await this.authenticateRepository.findByAssocieted(input.associeted_id)
        else if (input.id)
            return await this.authenticateRepository.findById(input.id)
        else return null
    }
}