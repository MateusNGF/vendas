import { iEntity, iUsecase } from 'src/domain/contracts';
import { AuthEntity } from 'src/domain/entities/auth.entity';

export abstract class iCreateTokenAuthenticateUsecase implements iUsecase {
  abstract exec(
    input: iCreateTokenAuthenticateUsecase.Input,
    settings ?: iCreateTokenAuthenticateUsecase.Settings
  ): Promise<iCreateTokenAuthenticateUsecase.Output>;
}

export namespace iCreateTokenAuthenticateUsecase {
  export class Input implements Partial<AuthEntity> {
    public id?: any;
    public associeted_id?: any;
    public email?: any;
    public password?: any;
  }

  export interface Settings extends iUsecase.Configuration {};

  export type Output = string;
}
