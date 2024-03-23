import { iDatabaseDriver } from 'src/infra/database/contracts';
import { TransactionEntity } from '../../../domain/entities';
import { iRemoveProductUsecase } from '../../../domain/usecases/product';
import { iProductRepository } from '../../../infra/database/contracts/repositorys/iProduct.repository';
import { INotificationErrorDriver } from 'src/domain/contracts';
import { iCreateTransactionUsecase } from 'src/domain/usecases/transaction/iCreateTransaction.usecase';

export class RemoveProductData implements iRemoveProductUsecase {
  constructor(
    private readonly productRepository: iProductRepository,
    private readonly createTransactionUsecase: iCreateTransactionUsecase,
    private readonly notificationErrorDriver: INotificationErrorDriver,
    private readonly databaseSession: iDatabaseDriver.iSessionManager
  ) {}

  async exec(input: iRemoveProductUsecase.Input, options?: iRemoveProductUsecase.Options): Promise<iRemoveProductUsecase.Output> {
    const session = await this.databaseSession.createSession();
    const notificationError = await this.notificationErrorDriver.create();

    const products = input.products;

    try {
      session.startTransaction();

      for (let i = 0; i < products.length; i++) {
        const productBasic: TransactionEntity.ProductIncomingTransaction = products[i];

        const productContent = await this.productRepository.productOutput(productBasic, { session });

        if (!productContent) {
          notificationError.AddNotification({
            key: 'id',
            message: `Product ${productBasic.id} not updated.`,
          });
          break;
        }
      }

      notificationError.CheckToNextStep();

      await session.commitTransaction();

      const returnContent: iRemoveProductUsecase.Output = {
        productsIds: input.products.map((p) => p.id),
        transaction: null,
      };

      if (options?.createTransaction) {
        returnContent.transaction = await this.createTransactionUsecase.exec(
          {
            type: 'outgoing',
            user_id: input.user_id,
            products: input.products.map((product) => ({
              id: product.id,
              quantity: product.quantity,
            })),
          },
          { session }
        );
      }

      return returnContent;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      console.log('passei');
      await session.endSession();
    }
  }
}
