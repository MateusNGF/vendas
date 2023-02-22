import { ProductEntity } from "src/domain/entities";
import { iListProductUsecase } from "src/domain/usecases/product";
import { BaseRepository } from ".";

export interface iProductRepository extends BaseRepository<ProductEntity> {
   validDuplicatedProduct(produt : Partial<ProductEntity>) : Promise<ProductEntity>
   create(product : ProductEntity) : Promise<{ id : string}>
   archiveProduct(productId  :string) : Promise<boolean>
   unarchiveProduct(productId  :string) : Promise<boolean>
   listProduct(filter : iProductRepository.FilterForList) : Promise<Array<ProductEntity>>
}

export namespace iProductRepository {
   export class FilterForList implements Partial<iListProductUsecase.Input> {
      public text?: string;
   } 
}