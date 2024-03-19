import { iUsecase } from 'src/domain/contracts';
import { AuthEntity, UserEntity } from 'src/domain/entities';

export abstract class iSignUpAccountUserUsecase implements iUsecase {
  abstract exec(
    input: iSignUpAccountUserUsecase.Input
  ): Promise<iSignUpAccountUserUsecase.Output>;
}

export namespace iSignUpAccountUserUsecase {
  export class Input implements UserEntity, Partial<AuthEntity> {
    public name: string;
    public email: string;
    public password: string;
  }

  // token
  export type Output = string;
}
