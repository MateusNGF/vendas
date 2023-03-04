import { iUsecase } from 'src/domain/contracts';
import { AuthEntity, UserEntity } from 'src/domain/entities';

export abstract class iCreateAccountUserUsecase implements iUsecase {
  abstract exec(
    input: iCreateAccountUserUsecase.Input
  ): Promise<iCreateAccountUserUsecase.Output>;
}

export namespace iCreateAccountUserUsecase {
  export class Input implements UserEntity, Partial<AuthEntity> {
    public name: string;
    public email: string;
    public password: string;
  }

  // token
  export type Output = string;
}
