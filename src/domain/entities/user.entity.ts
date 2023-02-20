import { iEntity } from '../contracts';
import { ObjectManager } from '../utils';

export class UserEntity extends iEntity {
  public readonly name: string;

  constructor(user: Partial<UserEntity>) {
    super(user);
    ObjectManager.assing(this, user);
  }
}
