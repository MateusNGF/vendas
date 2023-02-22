import { Collection, Db, Filter } from "mongodb";
import { TransactionEntity } from "src/domain/entities/transaction.entity";
import { generateID } from "src/domain/utils";
import { iTransactionRepository } from "../../contracts/repositorys/iTransaction.repository";

export class TransactionRepository implements iTransactionRepository {
    
    constructor(
        private readonly database: Db,
        private readonly colletionTransaction: Collection<TransactionEntity>
    ) {}
    findById(id: string): Promise<TransactionEntity> {
        return this.findOneWithProjection({ id })
    }

    async create(transaction: TransactionEntity): Promise<{ id: string; }> {
        const generateId = transaction.id ? transaction.id : generateID()
        const result = await this.colletionTransaction.insertOne({
            ...transaction,
            id : generateId
        })

        if (result.insertedId) return { id : generateId}
        else return null
    }

    private findOneWithProjection(filter: Filter<TransactionEntity>): Promise<TransactionEntity> {
        return this.colletionTransaction.findOne(filter, { projection: { _id: 0 } })
    }
}