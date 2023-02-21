import { iController } from "../../../application/contracts";
import { HttpRequest, HttpResponse } from "src/application/helpers/http";
import { iCreateAccountUser } from "src/domain/usecases/user";
import { ObjectManager } from "../../../domain/utils";

export class CreateAccountUserController extends iController {
    constructor(
        private readonly createAccountUserUsecase : iCreateAccountUser
    ){
        super();
    }
    async exec(request: HttpRequest): Promise<HttpResponse>   {
        try{
            const incomingData = request.body

            ObjectManager.hasKeys<iCreateAccountUser.Input>(['email', 'name', 'password'], incomingData)

            const userCreated = await this.createAccountUserUsecase.exec({
                email : incomingData.email,
                name : incomingData.name,
                password : incomingData.password
            })

            return this.sendSucess(200, {token :userCreated})
        }catch(e){
            return this.sendError(e)
        }
    }
}