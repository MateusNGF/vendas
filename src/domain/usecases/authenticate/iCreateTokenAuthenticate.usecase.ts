import { iEntity, iUsecase } from 'src/domain/contracts';
import { AuthEntity } from 'src/domain/entities/auth.entity';

export abstract class iCreateTokenAuthenticateUsecase implements iUsecase {
  abstract exec(
    input: iCreateTokenAuthenticateUsecase.Input
  ): Promise<iCreateTokenAuthenticateUsecase.Output>;
}

export namespace iCreateTokenAuthenticateUsecase {
  export class Input implements Partial<AuthEntity> {
    public id?: any;
    public associeted_id?: any;
    public email?: any;
    public password?: any;
  }

  export type Output = string;
}
