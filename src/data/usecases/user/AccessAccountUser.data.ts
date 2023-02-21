import { BadRequestError } from "../../../domain/errors";
import { iCreateTokenAuthenticate } from "src/domain/usecases/authenticate";
import { iAccessAccountUser } from "src/domain/usecases/user";

export class AccessAccountUser implements iAccessAccountUser {

    constructor(
        private readonly createTokenAuthenticate : iCreateTokenAuthenticate
    ){}
    async exec(input: iAccessAccountUser.Input): Promise<string> {
        const token  = await this.createTokenAuthenticate.exec({
            email : input.email,
            password : input.password
        })

        if (!token) throw new BadRequestError("Account not found.")
        
        return token
    }
}