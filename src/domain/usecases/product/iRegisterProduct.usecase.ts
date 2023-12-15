import { iUsecase } from 'src/domain/contracts';
import { ProductEntity, UserEntity } from 'src/domain/entities';

export abstract class iRegisterProductUsecase implements iUsecase {
  abstract exec(
    input: iRegisterProductUsecase.Input,
    options ?: iRegisterProductUsecase.Options
  ): Promise<iRegisterProductUsecase.Output>;
  
}

export namespace iRegisterProductUsecase {
  export interface Input {
    user_id: string;
    products: Array<ProductContent>
  } 

  export interface Options extends iUsecase.Options {
    createTransaction ?: boolean
  }
  
  export interface ProductContent { 
      name: string;
      sale_price: number;
      stock: number;
  }

  export interface Output {
    productsIds: Array<string>;
    transaction : any
  } 
}
