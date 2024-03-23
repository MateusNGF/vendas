import { iEntity } from '../contracts';
import { ObjectManager } from '../utils';

export class CompanyEntity extends iEntity {
  public readonly name: string = null;
  public readonly fantasy_name: string = null;
  public readonly owner_id: string = null;
  public readonly created_by: string = null;

  constructor(company: Partial<CompanyEntity>) {
    super(company);
    ObjectManager.assing(this, company);
  }
}
