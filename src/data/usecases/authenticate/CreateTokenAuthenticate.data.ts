import { AuthEntity } from "src/domain/entities/auth.entity";
import { iCreateTokenAuthenticate } from "src/domain/usecases/authenticate";
import { iTokenAdapter } from "src/infra/cryptography/contracts";
import { iAuthenticateRepository } from "src/infra/database/contracts/repositorys/iAuthenticate.repository";



export class CreateTokenAuthenticate implements iCreateTokenAuthenticate {

    constructor(
        private readonly authenticateRepository : iAuthenticateRepository,
        private readonly tokenAdapter : iTokenAdapter
    ){}

    async exec(input: iCreateTokenAuthenticate.Input): Promise<string> {
        let authenticate : AuthEntity;

        if (input.associeted_id){
            authenticate = await this.authenticateRepository.findByAssocieted(input.associeted_id)
        }else{
            authenticate = await this.authenticateRepository.findById(input.id)
        }

        if (!authenticate) return null;

        const token = await this.tokenAdapter.sing({
            id : authenticate.id,
            email : authenticate.email
        })

        return token
    }
}