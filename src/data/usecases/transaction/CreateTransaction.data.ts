import { OperationFailed } from '../../../domain/errors';
import { iCreateTransactionUsecase } from 'src/domain/usecases/transaction/iCreateTransaction.usecase';
import { iDatabaseDriver } from 'src/infra/database/contracts';
import { iProductRepository } from 'src/infra/database/contracts/repositorys/iProduct.repository';
import { iTransactionRepository } from 'src/infra/database/contracts/repositorys/iTransaction.repository';
import { iUserRepository } from 'src/infra/database/contracts/repositorys/iUser.repository';
import { ObjectManager, Writeable } from '../../../domain/utils';
import { ProductEntity, TransactionEntity } from '../../../domain/entities';
import { iQueueDriver } from '../../../infra/queue/contracts/iQueue';
import { INotificationErrorManager } from '../../../domain/contracts';

export class CreateTransactionForProductsData
  implements iCreateTransactionUsecase
{
  constructor(
    private readonly queueDriver: iQueueDriver.iQueueManager,
    private readonly databaseSession: iDatabaseDriver.iSessionManager,
    private readonly notificationErrorHandler: INotificationErrorManager,
    private readonly userRepository: iUserRepository,
    private readonly productRepository: iProductRepository,
    private readonly transactionRepository: iTransactionRepository
  ) {}
  async exec(
    input: iCreateTransactionUsecase.Input,
    options?: iCreateTransactionUsecase.Options
  ) {
    this.Validation(input);

    const session = options?.session;

    try {
      const { products, user_id } = input;

      // Os dados desse usuário remetem a um funcionario ou vendedor que vai operar a transação.
      const user_content = await this.userRepository.findById(user_id, {
        session,
      });
      if (!user_content) {
        throw new OperationFailed(`User with id ${user_id} not found.`);
      }

      const transactionPartial: Writeable<TransactionEntity> = {
        type: input.type,
        products: [],
        user_id: user_content.id,
        total_price: 0,
      };

      for (let i = 0; i < products.length; i++) {
        const productBasic: TransactionEntity.ProductIncomingTransaction =
          products[i];

        const productContent = await this.productRepository.findById(
          productBasic.id,
          { session }
        );

        if (!productContent || !productContent.id) {
          this.notificationErrorHandler.AddNotification({
            key: 'NOT_FOUND',
            message: `Product ${productBasic.id} not found.`,
          });

          break;
        }

        transactionPartial.products.push({
          id: productBasic.id,
          name: productContent.name,
          sale_price: productContent.sale_price,
          quantity: productBasic.quantity,
        });

        transactionPartial.total_price += Number(
          productContent.sale_price * productBasic.quantity
        );
      }

      this.notificationErrorHandler.CheckToNextStep();

      const transaction = new TransactionEntity(transactionPartial);
      const resultOperation = await this.transactionRepository.create(
        transaction,
        { session }
      );

      this.queueDriver.publishInQueue<Partial<TransactionEntity>>(
        'transaction',
        {
          id: resultOperation.id,
          user_id: transaction.user_id,
          customer_id: transaction.customer_id,
          created_at: transaction.created_at,
          products: transaction.products,
        }
      );

      return {
        id: resultOperation.id,
        created_at: transaction.created_at,
      };
    } catch (e) {
      throw e;
    }
  }

  private makeProductContentTransaction(
    incomingProductData: TransactionEntity.ProductIncomingTransaction,
    product: ProductEntity
  ): TransactionEntity.ProductContentTransaction {
    return;
  }

  private Validation(input: iCreateTransactionUsecase.Input) {
    ObjectManager.hasKeysWithNotification<iCreateTransactionUsecase.Input>(
      ['type', 'products'],
      input,
      this.notificationErrorHandler
    );

    if (!['incoming', 'outgoing'].includes(input.type)) {
      this.notificationErrorHandler.AddNotification({
        key: 'type',
        message: 'Invalid type, accept incoming or outgoing.',
      });
    }

    this.notificationErrorHandler.CheckToNextStep();

    if (input.products.length < 1) {
      throw new OperationFailed(
        'Need one or more products for creating transaction.'
      );
    }

    ObjectManager.hasKeysWithNotification<TransactionEntity.ProductIncomingTransaction>(
      ['id', 'quantity'],
      input.products,
      this.notificationErrorHandler
    );

    this.notificationErrorHandler.CheckToNextStep();
  }
}
