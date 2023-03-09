import { iEntity } from "../contracts";
import { ObjectManager } from "../utils";


export class CompanyEntity extends iEntity {
    
    public readonly fantasy_name ?: string = null
    public readonly corporate_name ?: string = null
    public readonly email ?: string = null
    public readonly owner ?: string = null 

    constructor(company : CompanyEntity){
        super(company)
        ObjectManager.assing(this, company)
    }
}