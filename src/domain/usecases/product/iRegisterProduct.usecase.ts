import { iUsecase } from 'src/domain/contracts';
import { ProductEntity, UserEntity } from 'src/domain/entities';

export abstract class iRegisterProductUsecase implements iUsecase {
  abstract exec(
    input: iRegisterProductUsecase.Input,
    settings ?: iRegisterProductUsecase.Settings
  ): Promise<iRegisterProductUsecase.Output>;
}

export namespace iRegisterProductUsecase {
  export class Input implements ProductEntity {
    public name: string;
    public sale_price: number;
    public stock: number;
    public created_by: string;
  }

  export interface Settings extends iUsecase.Configuration {};

  export type Output = {
    id: string;
  };
}
