import { iUsecase } from "src/domain/contracts";
import { TransactionEntity } from "src/domain/entities/transaction.entity";

export abstract class iCreateTransactionUsecase implements iUsecase {
    abstract exec(input: iCreateTransactionUsecase.Input): Promise<iCreateTransactionUsecase.Output>;
}

export namespace iCreateTransactionUsecase {
    export type Input = {
        user_id : string
        products : Array<TransactionEntity.ProductContent>
    }

    export type Output = {
        id  :string,
        created_at : Date
    }
}