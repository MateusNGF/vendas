import { iUsecase } from "src/domain/contracts";
import { TransactionEntity } from "src/domain/entities/transaction.entity";

export abstract class iCreateIncomingTransactionForProductsUsecase implements iUsecase {
    abstract exec(input: iCreateIncomingTransactionForProductsUsecase.Input): Promise<iCreateIncomingTransactionForProductsUsecase.Output>;
}

export namespace iCreateIncomingTransactionForProductsUsecase {
    export type Input = {
        user_id : string
        products : Array<TransactionEntity.ProductIncomingTransaction>
    }

    export type Output = {
        id  :string,
        created_at : Date
    }
}