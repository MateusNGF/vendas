import { iUsecase } from 'src/domain/contracts';
import { ProductEntity } from 'src/domain/entities';

export abstract class iGetProductUsecase implements iUsecase {
  abstract exec(input: iGetProductUsecase.Input): Promise<iGetProductUsecase.Output>;
}

export namespace iGetProductUsecase {
  export type Input = {
    product_id: string;
  };

  export type Output = ProductEntity;
}
