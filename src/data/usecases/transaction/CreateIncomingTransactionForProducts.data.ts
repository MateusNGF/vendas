import { TransactionEntity } from '../../../domain/entities/transaction.entity';
import { OperationFailed } from '../../../domain/errors';
import { iCreateIncomingTransactionForProductsUsecase } from 'src/domain/usecases/transaction/iCreateTransaction.usecase';
import { iDatabaseDriver } from 'src/infra/database/contracts';
import { iProductRepository } from 'src/infra/database/contracts/repositorys/iProduct.repository';
import { iTransactionRepository } from 'src/infra/database/contracts/repositorys/iTransaction.repository';
import { iUserRepository } from 'src/infra/database/contracts/repositorys/iUser.repository';
import { Writeable } from 'src/domain/utils';
import { ProductEntity } from 'src/domain/entities';
import { NotificationHandlerCreateIncomingTransactionForProducts } from '../../../main/factories/main/errors';

export class CreateIncomingTransactionForProductsData
  implements iCreateIncomingTransactionForProductsUsecase
{
  constructor(
    private readonly databaseSession: iDatabaseDriver.iSession,
    private readonly userRepository: iUserRepository,
    private readonly productRepository: iProductRepository,
    private readonly transactionRepository: iTransactionRepository
  ) {}
  async exec(input: iCreateIncomingTransactionForProductsUsecase.Input) {
    const session = this.databaseSession;
    try {
      session.startTransaction();

      const { products, user_id } = input;

      const user = await this.userRepository.findById(user_id, { session });
      if (!user) throw new OperationFailed('User not found.');

      let transactionPartial: Writeable<TransactionEntity> = {
        type: 'incoming',
        products: [],
        user_id: user_id,
        total_price: 0,
      };

      const NotificationError = NotificationHandlerCreateIncomingTransactionForProducts();


      for (let i = 0; i < products.length; i++) {
        const productBasic: TransactionEntity.ProductIncomingTransaction = products[i];

        const productContent = await this.productRepository.productOutput(
          productBasic,
          { session }
        );

        if (!productContent) {
          NotificationError.AddNotification({
            key : "id",
            message: `Product ${productBasic.id} not updated.`
          })
          return;
        }

        transactionPartial.products.push(
          this.makeProductContentTransaction(productBasic, productContent)
        );
        transactionPartial.total_price += Number(
          productContent.sale_price * productBasic.quantity
        );
      }

      NotificationError.CheckToNextStep();

      const transaction = new TransactionEntity(transactionPartial);
      const result = await this.transactionRepository.create(transaction);

      return {
        id: result.id,
        created_at: transaction.created_at,
      };
    } catch (e) {
      await session.abortTransaction();
      throw e
    } finally {
      await session.endSession();
    }
  }

  private makeProductContentTransaction(
    incomingProductData: TransactionEntity.ProductIncomingTransaction,
    product: ProductEntity
  ): TransactionEntity.ProductContentTransaction {
    return {
      id: product.id,
      name: product.name,
      sale_price: product.sale_price,
      quantity: incomingProductData.quantity,
    };
  }
}
