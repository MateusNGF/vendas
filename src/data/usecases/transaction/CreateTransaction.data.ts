import { TransactionEntity } from "src/domain/entities/transaction.entity";
import { BadRequestError } from "src/domain/errors";
import { iCreateTransactionUsecase } from "src/domain/usecases/transaction/iCreateTransaction.usecase";
import { iProductRepository } from "src/infra/database/contracts/repositorys/iProduct.repository";
import { iTransactionRepository } from "src/infra/database/contracts/repositorys/iTransaction.repository";
import { iUserRepository } from "src/infra/database/contracts/repositorys/iUser.repository";

export class CreateTransactionData implements iCreateTransactionUsecase {
    constructor(
        private readonly transactionRepository : iTransactionRepository,
        private readonly userRepository : iUserRepository,
        private readonly productRepository : iProductRepository
    ){}
    async exec(input: iCreateTransactionUsecase.Input): Promise<iCreateTransactionUsecase.Output> {
        const user  = await this.userRepository.findById(input.user_id)
        if (!user) throw new BadRequestError('User not found')

        const productsId = input.products.map(p => p.id) 
        await this.productRepository.findByIds(productsId)
        input.products.forEach((product : TransactionEntity.ProductContent) => {
            
        })

        const transaction = new TransactionEntity({
            type : "incoming",
            products : input.products,
            user_id : user.id
        })

        const { id } = await this.transactionRepository.create(transaction)

        return Promise.resolve({
            id : id,
            created_at : transaction.created_at
        })
    }
}