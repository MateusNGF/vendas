import { TransactionEntity } from "src/domain/entities/transaction.entity";
import { BaseRepository } from ".";

export interface iTransactionRepository extends BaseRepository<TransactionEntity> {
    create(transaction : Partial<TransactionEntity>) : Promise<{ id : string}>
}