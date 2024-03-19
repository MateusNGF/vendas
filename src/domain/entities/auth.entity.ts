import * as CONSTANTS from '../constanst';
import { iEntity } from '../contracts';
import { ObjectManager } from '../utils';

export class AuthEntity extends iEntity {
  public readonly email: string = null;
  public readonly password: string = null;
  public readonly associeted_id: string = null;
  public readonly access_level?: CONSTANTS.SYSTEM_PERMISSION = 0;

  constructor(auth: Partial<AuthEntity>) {
    super(auth);
    ObjectManager.assing(this, auth);
  }
}

export namespace AuthEntity {
  export type AccessLevel = number;
}
