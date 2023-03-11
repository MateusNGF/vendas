import { iUsecase } from 'src/domain/contracts';
import { AuthEntity } from 'src/domain/entities/auth.entity';

export abstract class iCreateAuthenticationUsecase implements iUsecase {
  abstract exec(
    input: iCreateAuthenticationUsecase.Input,
    settings ?: iCreateAuthenticationUsecase.Settings
  ): Promise<iCreateAuthenticationUsecase.Output>;
}

export namespace iCreateAuthenticationUsecase {
  export class Input implements Partial<AuthEntity> {
    public associeted_id: string;
    public email: string;
    public password: string;
  }

  export interface Settings extends iUsecase.Configuration {};

  export type Output = {
    id: string;
  };
}
