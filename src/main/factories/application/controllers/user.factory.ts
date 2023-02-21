import { iController } from "src/application/contracts";
import { CreateAccountUserController } from "../../../../application/controllers/user";
import { makeCreateAccountUserUsecase } from "../usecases/user.factory";

export function makeCreateAccountUserController() : iController {
    return new CreateAccountUserController(makeCreateAccountUserUsecase())
}