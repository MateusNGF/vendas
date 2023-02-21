import { ProductEntity } from "src/domain/entities";
import { BaseRepository } from ".";

export interface iProductRepository extends BaseRepository<ProductEntity> {
   validDuplicatedProduct(produt : Partial<ProductEntity>) : Promise<ProductEntity>
   create(product : ProductEntity) : Promise<{ id : string}>
   archiveProduct(productId  :string) : Promise<boolean>
   unarchiveProduct(productId  :string) : Promise<boolean>
}