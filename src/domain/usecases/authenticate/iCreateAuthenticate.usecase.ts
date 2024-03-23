import { iUsecase } from 'src/domain/contracts';
import { AuthEntity } from 'src/domain/entities/auth.entity';

export abstract class iCreateAuthenticationUsecase implements iUsecase {
  abstract exec(input: iCreateAuthenticationUsecase.Input): Promise<iCreateAuthenticationUsecase.Output>;
}

export namespace iCreateAuthenticationUsecase {
  export class Input implements Partial<AuthEntity> {
    public associeted_id: string;
    public email: string;
    public password: string;
  }

  export type Output = {
    id: string;
  };
}
