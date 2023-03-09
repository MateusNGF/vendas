import { iUsecase } from "src/domain/contracts";
import { CompanyEntity } from "src/domain/entities/company.entity";



export abstract class iCreateCompanyUsecase implements iUsecase {
    abstract exec(input: iCreateCompanyUsecase.Input, settings?: iCreateCompanyUsecase.Settings): Promise<iCreateCompanyUsecase.Output>;
}


export namespace iCreateCompanyUsecase {
    export type  Input = CompanyEntity
    export interface Settings extends iUsecase.Configuration {}
    export type Output = {
        company_id : string
    }
}