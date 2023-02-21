import { AuthEntity } from "src/domain/entities/auth.entity";
import { UnauthorizedError } from "../../../domain/errors";
import { PayloadToken } from "src/domain/types";
import { iCreateTokenAuthenticateUsecase, iGetAuthenticateRecordUsecase } from "src/domain/usecases/authenticate";
import { iHashAdapter, iTokenAdapter } from "src/infra/cryptography/contracts";



export class CreateTokenAuthenticateData implements iCreateTokenAuthenticateUsecase {

    constructor(
        private readonly tokenAdapter: iTokenAdapter,
        private readonly getAuthenticateRecord: iGetAuthenticateRecordUsecase,
        private readonly hashAdapter: iHashAdapter
    ) { }

    async exec(input: iCreateTokenAuthenticateUsecase.Input): Promise<iCreateTokenAuthenticateUsecase.Output> {
        let authenticate: AuthEntity = await this.getAuthenticateRecord.exec({
            email: input.email,
            associeted_id: input.associeted_id,
            id: input.id
        })

        if (!authenticate) return null;

        if (input.password) {
            const matchPassword = await this.hashAdapter.compare(
                input.password,
                authenticate.password
            )

            if (!matchPassword) throw new UnauthorizedError('Password invalid.')
        }


        return await this.makeTokenByAuthenticate(authenticate)
    }


    private makeTokenByAuthenticate(authenticate: AuthEntity) {
        return this.tokenAdapter.sing<PayloadToken>({
            auth_id: authenticate.id,
            user_id : authenticate.associeted_id,
            access_level : authenticate.access_level 
        })
    }
}