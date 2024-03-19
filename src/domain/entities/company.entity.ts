import * as CONSTANTS from '../constanst';
import { iEntity } from '../contracts';
import { ObjectManager } from '../utils';


interface IAssocietedUserCompany {
    type : CONSTANTS.ASSOCITED_TYPE_USER_COMPANY
    user_id : string
}

export class CompanyEntity extends iEntity {
  public readonly name: string = null;
  public readonly fantasy_name: string = null;
  public readonly users: Array<IAssocietedUserCompany> = [];

  constructor(company: Partial<CompanyEntity>) {
    super(company);
    ObjectManager.assing(this, company);
  }
}
