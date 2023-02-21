import { iEntity } from '../contracts';
import { ObjectManager } from '../utils';

export class AuthEntity extends iEntity {
  public readonly email: string = null;
  public readonly password: string = null;
  public readonly associeted_id: string = null;
  public readonly access_level ?: number = 0

  constructor(auth: Partial<AuthEntity>) {
    super(auth);
    ObjectManager.assing(this, auth);
  }
}