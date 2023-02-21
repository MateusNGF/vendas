import { iController } from "src/application/contracts";
import { AccessAccountUserController, CreateAccountUserController } from "../../../../application/controllers/user";
import { makeAccessAccountUserUsecase, makeCreateAccountUserUsecase } from "../usecases/user.factory";

export function makeCreateAccountUserController() : iController {
    return new CreateAccountUserController(makeCreateAccountUserUsecase())
}

export function makeAccessAccountUserController() : iController {
    return new AccessAccountUserController(
        makeAccessAccountUserUsecase()
    )
}