import { iUsecase } from 'src/domain/contracts';
import { AuthEntity } from 'src/domain/entities';

export abstract class iSignInAccountUserUsecase implements iUsecase {
  abstract exec(input: iSignInAccountUserUsecase.Input): Promise<iSignInAccountUserUsecase.Output>;
}

export namespace iSignInAccountUserUsecase {
  export class Input implements Partial<AuthEntity> {
    public email: string;
    public password: string;
  }

  // token
  export type Output = string;
}
