import { AccessAccountUserData, CreateAccountUserData, GetAccountUserData } from "../../../../data/usecases/user";
import { iAccessAccountUserUsecase, iCreateAccountUserUsecase, iGetAccountUserUsecase } from "src/domain/usecases/user";
import { makeUserRepository } from "../../infra/database/mongo.factory";
import { makeCreateAuthenticateUsecase, makeCreateTokenAuthenticateUsecase } from "./authenticate.factory";

export function makeCreateAccountUserUsecase() : iCreateAccountUserUsecase {
    return new CreateAccountUserData(
        makeUserRepository(),
        makeCreateAuthenticateUsecase(),
        makeCreateTokenAuthenticateUsecase()
    )
}

export function makeAccessAccountUserUsecase() : iAccessAccountUserUsecase {
    return new AccessAccountUserData(
        makeCreateTokenAuthenticateUsecase()
    )
}


export function makeGetAccountUserUsecase() : iGetAccountUserUsecase {
    return  new GetAccountUserData(
        makeUserRepository()
    )
}