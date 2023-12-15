import { ProductEntity } from 'src/domain/entities';
import { TransactionEntity } from 'src/domain/entities/transaction.entity';
import { BaseFilterForListing } from 'src/domain/types';
import { BaseRepository } from '.';

export interface iProductRepository extends BaseRepository<ProductEntity> {
  isDuplicatedProduct(
    product: Partial<ProductEntity>,
    options?: iProductRepository.Options
  ): Promise<ProductEntity>;
  registerProduct(product: Array<ProductEntity>, options?: iProductRepository.Options): Promise<boolean>;
  archiveProduct(productId: string, options?: iProductRepository.Options): Promise<boolean>;
  unarchiveProduct(productId: string, options?: iProductRepository.Options): Promise<boolean>;
  listProduct(filter: iProductRepository.FilterForList, options?: iProductRepository.Options): Promise<Array<ProductEntity>>;
  productOutput(productDetails: TransactionEntity.ProductIncomingTransaction, options?: iProductRepository.Options): Promise<ProductEntity>;
  findById(id: string, options?: iProductRepository.Options): Promise<ProductEntity>;
  findByIds(ids: Array<string>, options?: iProductRepository.Options): Promise<Array<ProductEntity>>;
}

export namespace iProductRepository {
  export interface FilterForList extends Partial<BaseFilterForListing> { }
  export interface Options extends BaseRepository.QueryOptions { }
}
