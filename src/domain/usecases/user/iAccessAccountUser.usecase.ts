import { iUsecase } from 'src/domain/contracts';
import { AuthEntity, UserEntity } from 'src/domain/entities';

export abstract class iAccessAccountUserUsecase implements iUsecase {
  abstract exec(
    input: iAccessAccountUserUsecase.Input
  ): Promise<iAccessAccountUserUsecase.Output>;
}

export namespace iAccessAccountUserUsecase {
  export class Input implements Partial<AuthEntity> {
    public email: string;
    public password: string;
  }

  // token
  export type Output = string;
}
