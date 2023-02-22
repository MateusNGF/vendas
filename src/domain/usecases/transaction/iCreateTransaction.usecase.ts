import { iUsecase } from "src/domain/contracts";
import { TransactionEntity } from "src/domain/entities/transaction.entity";

export abstract class iCreateTransaction implements iUsecase {
    abstract exec(input: any, ...args: any[]): Promise<any>;
}

export namespace iCreateTransaction {
    export type Input = {
        user_id : string
        products : Array<TransactionEntity.ProductContent>
    }
}