import { AuthEntity } from "src/domain/entities/auth.entity";
import { UnauthorizedError } from "../../../domain/errors";
import { PayloadToken } from "src/domain/types";
import { iCreateTokenAuthenticate, iGetAuthenticateRecord } from "src/domain/usecases/authenticate";
import { iHashAdapter, iTokenAdapter } from "src/infra/cryptography/contracts";



export class CreateTokenAuthenticate implements iCreateTokenAuthenticate {

    constructor(
        private readonly tokenAdapter: iTokenAdapter,
        private readonly getAuthenticateRecord: iGetAuthenticateRecord,
        private readonly hashAdapter: iHashAdapter
    ) { }

    async exec(input: iCreateTokenAuthenticate.Input): Promise<iCreateTokenAuthenticate.Output> {
        let authenticate: AuthEntity = await this.getAuthenticateRecord.exec({
            email: input.email,
            associeted_id: input.associeted_id,
            id: input.id
        })

        if (!authenticate) return null;

        if (input.password) {
            const matchPassword = await this.hashAdapter.compare(
                authenticate.password,
                input.password
            )

            if (!matchPassword) throw new UnauthorizedError('Password invalid.')
        }


        return this.makeTokenByAuthenticate(authenticate)
    }


    private async makeTokenByAuthenticate(authenticate: AuthEntity) {
        return await this.tokenAdapter.sing<PayloadToken>({
            auth_id: authenticate.id,
            user_id : authenticate.associeted_id,
            access_level : authenticate.access_level 
        })
    }
}