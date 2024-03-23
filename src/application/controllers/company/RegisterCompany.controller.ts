import { iController } from "../../../application/contracts";
import { HttpRequest, HttpResponse } from "../../../application/helpers/http";
import { CompanyEntity } from "../../../domain/entities/company.entity";
import { OperationFailed } from "../../../domain/errors";
import { iRegisterCompanyUsecase } from "../../../domain/usecases/company";



export class RegisterCompanyController extends iController {
    constructor(
        private readonly registerCompanyUsecase : iRegisterCompanyUsecase
    ){super()}


    async exec(request: HttpRequest): Promise<HttpResponse> {
        try {
            const content: Partial<CompanyEntity> = request.body;
            if (!content) {
              throw new OperationFailed('body needed.');
            }
      
            const currentUser = request.headers.decodedTokenUser.user_id;
            
            const companyContent =
              await this.registerCompanyUsecase.exec(
                {
                  created_by: currentUser,
                  company: content,
                }
              );

            return this.sendSucess(200, companyContent);
          } catch (e) {
            return this.sendError(e);
          }
    }
}