import { Collection, Db, Filter } from 'mongodb';
import { ProductEntity } from 'src/domain/entities';
import { TransactionEntity } from 'src/domain/entities/transaction.entity';
import { iProductRepository } from '../../contracts/repositorys/iProduct.repository';

export class ProductRepository implements iProductRepository {
  constructor(
    private readonly database: Db,
    private readonly colletion: Collection<ProductEntity>
  ) {}

  async findByIds(ids: string[]): Promise<ProductEntity[]> {
    return await this.colletion.find({ id: { $in: ids } }).toArray()
  }

  async productOutput(
    productDetails: TransactionEntity.ProductIncomingTransaction,
    options?: iProductRepository.Options
  ): Promise<ProductEntity> {
    const session = options && options.session ? options.session.get() : null;

    const result = await this.colletion.findOneAndUpdate(
      {
        id: productDetails.id,
        stock: { $gte: productDetails.quantity }, // Verifica se a quantidade de estoque é suficiente
      },
      {
        $inc: {
          stock: -productDetails.quantity,
        },
        $set: {
          updated_at: new Date(),
        }
      },
      { 
        session, returnDocument : 'after'
      }
    );

    if (!result.ok) return null;
    else return result.value;
  }

  listProduct(
    filter: iProductRepository.FilterForList
  ): Promise<ProductEntity[]> {
    let where: Filter<ProductEntity>;
    if (filter) {
      if (filter.text) {
        where = {
          ...where,
          $text: { $search: filter.text },
        };
      }
    }

    return this.colletion
      .find(where)
      .limit(filter.limit ?? 50)
      .skip(filter.offset ?? 0)
      .toArray();
  }

  isDuplicatedProduct(
    produt: Partial<ProductEntity>
  ): Promise<ProductEntity> {
    return this.findOneWithProjection({ name: produt.name });
  }

  async registerProduct(products: Array<ProductEntity>, options ?: iProductRepository.Options): Promise<boolean> {
    console.log(products)
    const result = await this.colletion.insertMany(products, { session : options?.session.get() });

    return result.insertedCount >= products.length
  }
  async archiveProduct(productId: string): Promise<boolean> {
    const result = await this.colletion.updateOne(
      { id: productId },
      { $set: { archived_date: new Date() } }
    );
    if (result.modifiedCount > 0) {
      return true;
    }
    return false;
  }

  async unarchiveProduct(productId: string): Promise<boolean> {
    const result = await this.colletion.updateOne(
      { id: productId },
      { $set: { archived_date: null } }
    );
    if (result.modifiedCount > 0) {
      return true;
    }
    return false;
  }

  findById(id: string): Promise<ProductEntity> {
    return this.findOneWithProjection({ id });
  }

  private findOneWithProjection(
    filter: Filter<ProductEntity>
  ): Promise<ProductEntity> {
    return this.colletion.findOne(filter, { projection: { _id: 0 } });
  }
}
