import { Collection, Db, Filter } from 'mongodb';
import { TransactionEntity } from 'src/domain/entities/transaction.entity';
import { generateID } from '../../../../domain/utils';
import { BaseRepository } from '../../contracts/repositorys';
import { iTransactionRepository } from '../../contracts/repositorys/iTransaction.repository';

export class TransactionRepository implements iTransactionRepository {
  constructor(private readonly colletionTransaction: Collection<TransactionEntity>) {}
  findById(id: string): Promise<TransactionEntity> {
    return this.findOneWithProjection({ id });
  }

  async create(transaction: TransactionEntity, options?: BaseRepository.QueryOptions): Promise<{ id: string }> {
    const session = options && options.session ? options.session.get() : null;

    const generateId = transaction.id ? transaction.id : generateID();
    const result = await this.colletionTransaction.insertOne(
      {
        ...transaction,
        id: generateId,
      },
      { session }
    );

    if (result.insertedId) return { id: generateId };
    else return null;
  }

  private findOneWithProjection(filter: Filter<TransactionEntity>): Promise<TransactionEntity> {
    return this.colletionTransaction.findOne(filter, {
      projection: { _id: 0 },
    });
  }
}
