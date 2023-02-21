import { iController } from "../../../application/contracts";
import { HttpRequest, HttpResponse } from "../../../application/helpers/http";
import { BadRequestError } from "../../../domain/errors";
import { iGetAccountUserUsecase } from "../../../domain/usecases/user";

export class GetAccountUserController extends iController {
    constructor(
        private readonly getAccountUserUsecase : iGetAccountUserUsecase
    ){super();}

    async exec(request: HttpRequest): Promise<HttpResponse> {
        try{

            const user_id = request.headers.decodedTokenUser.user_id

            const user_data = await this.getAccountUserUsecase.exec({
                user_id
            })

            if (!user_data) throw new BadRequestError('Account not found.')

            return this.sendSucess(200, user_data)
        }catch(e){
            return this.sendError(e)
        }
    }
}