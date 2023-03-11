import { iUsecase } from 'src/domain/contracts';
import { AuthEntity } from 'src/domain/entities/auth.entity';

export abstract class iGetAuthenticateRecordUsecase implements iUsecase {
  abstract exec(
    input: iGetAuthenticateRecordUsecase.Input,
    settings?: iGetAuthenticateRecordUsecase.Settings
  ): Promise<iGetAuthenticateRecordUsecase.Output>;
}

export namespace iGetAuthenticateRecordUsecase {
  export class Input implements Partial<AuthEntity> {
    public id?: any;
    public email?: string;
    public associeted_id?: string;
  }

  export interface Settings extends iUsecase.Configuration {};

  export type Output = AuthEntity;
}
