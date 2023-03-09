import { iEntity } from '../contracts';
import { ObjectManager } from '../utils';

export class UserEntity extends iEntity {
  public readonly name: string = null;
  public readonly company_id ?: string = null;

  constructor(user: Partial<UserEntity>) {
    super(user);
    ObjectManager.assing(this, user);
  }
}
