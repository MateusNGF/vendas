import { CreateAccountUser } from "../../../../data/usecases/user";
import { iCreateAccountUser } from "src/domain/usecases/user";
import { makeUserRepository } from "../../infra/database/mongo.factory";
import { makeCreateAuthenticateUsecase, makeCreateTokenAuthenticateUsecase } from "./authenticate.factory";

export function makeCreateAccountUserUsecase() : iCreateAccountUser {
    return new CreateAccountUser(
        makeUserRepository(),
        makeCreateAuthenticateUsecase(),
        makeCreateTokenAuthenticateUsecase()
    )
}