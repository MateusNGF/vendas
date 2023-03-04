import { ProductEntity } from "src/domain/entities";
import { TransactionEntity } from "src/domain/entities/transaction.entity";
import { BaseFilterForListing } from "src/domain/types";
import { BaseRepository } from ".";

export interface iProductRepository extends BaseRepository<ProductEntity> {
   validDuplicatedProduct(produt : Partial<ProductEntity>) : Promise<ProductEntity>
   create(product : ProductEntity) : Promise<{ id : string}>
   archiveProduct(productId  :string) : Promise<boolean>
   unarchiveProduct(productId  :string) : Promise<boolean>
   listProduct(filter : iProductRepository.FilterForList) : Promise<Array<ProductEntity>>
   productOutput(productDetails : TransactionEntity.ProductIncomingTransaction, options?: BaseRepository.QueryOptions) : Promise<ProductEntity>
   findByIds(ids : Array<string>) : Array<ProductEntity>
}

export namespace iProductRepository {
   export interface FilterForList extends Partial<BaseFilterForListing> {}
}