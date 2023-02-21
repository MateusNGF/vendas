import { UserEntity } from "../../../domain/entities";
import { BadRequestError } from "../../../domain/errors";
import { iCreateAuthentication, iCreateTokenAuthenticate } from "src/domain/usecases/authenticate";
import { iCreateAccountUser } from "src/domain/usecases/user";
import { iUserRepository } from "src/infra/database/contracts/repositorys/iUser.repository";

export class CreateAccountUser implements iCreateAccountUser {
    constructor(
        private readonly userRepository : iUserRepository,
        private readonly createAuthentication : iCreateAuthentication,
        private readonly createTokenAuthenticate : iCreateTokenAuthenticate
    ){}
    async exec(input: iCreateAccountUser.Input): Promise<string> {

        const userPartial = this.userRepository.makePartial({
            name : input.name
        })

        const authenticate = await this.createAuthentication.exec({
            email : input.email,
            password : input.password,
            associeted_id : userPartial.id
        })

        if (!authenticate) 
            throw new BadRequestError('Not completed action of create authenticate.')

        const user = new UserEntity({
            id : userPartial.id,
            name : userPartial.name
        })

        const {id} = await this.userRepository.create(user)
        const token = await this.createTokenAuthenticate.exec({associeted_id : id})
        if (!token) throw new BadRequestError('Not complete genereate token.')
        return token
    }
}