import { CreateCompanyData } from "../../../..//data/usecases/company/CreateCompany.data";
import { iCreateCompanyUsecase } from "../../../..//domain/usecases/company/iCreateCompany.usecase";
import { makeCompanyRepository, makeUserRepository } from "../../infra/database/mongo.factory";

export const makeCreateCompanyUsecase = (): iCreateCompanyUsecase => {
    return new CreateCompanyData(
        makeCompanyRepository()
    )
} 