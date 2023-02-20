import { iEntity } from '../contracts';
import { ObjectManager } from '../utils';

export class AuthEntity extends iEntity {
  public readonly email: string;
  public readonly password: string;
  public readonly associeted_id: string;

  constructor(auth: Partial<AuthEntity>) {
    super(auth);
    ObjectManager.assing(this, auth);
  }
}
