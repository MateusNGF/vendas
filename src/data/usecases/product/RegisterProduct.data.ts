import { iDatabaseDriver } from 'src/infra/database/contracts';
import { ProductEntity } from '../../../domain/entities';
import { OperationFailed } from '../../../domain/errors';
import { iRegisterProductUsecase } from '../../../domain/usecases/product';
import { iProductRepository } from '../../../infra/database/contracts/repositorys/iProduct.repository';
import { INotificationErrorDriver } from '../../../domain/contracts';
import { ObjectManager, generateID } from '../../../domain/utils';
import { iCreateTransactionUsecase } from '../../../domain/usecases/transaction/iCreateTransaction.usecase';

export class RegisterProductData implements iRegisterProductUsecase {
  constructor(
    private readonly databaseSession: iDatabaseDriver.iSessionManager,
    private readonly notificationErrorDriver: INotificationErrorDriver,
    private readonly productRepository: iProductRepository,
    private readonly createTransactionUsecase: iCreateTransactionUsecase
  ) {}

  async exec(input: iRegisterProductUsecase.Input, options: iRegisterProductUsecase.Options): Promise<iRegisterProductUsecase.Output> {
    const session = await this.databaseSession.createSession();
    const notificationError = await this.notificationErrorDriver.create();

    session.startTransaction();

    try {
      const products = input.products;

      this.ValidateInputContent(input, { notificationError });
      await this.ValidateProductContent(products, { session, notificationError });

      const formartedProducts = products.map((product) => {
        return new ProductEntity({
          id: generateID(),
          name: product.name,
          sale_price: product.sale_price,
          stock: product.stock,
          created_by: input.user_id,
        });
      });

      const resultRegisterInDatabase = await this.productRepository.registerProduct(formartedProducts, { session });
      if (!resultRegisterInDatabase) {
        throw new OperationFailed('Product registration failed. Try again.');
      }

      const result: iRegisterProductUsecase.Output = {
        productsIds: formartedProducts.map((p) => p.id),
        transaction: null,
      };

      if (options?.createTransaction) {
        result.transaction = await this.createTransactionUsecase.exec(
          {
            user_id: input.user_id,
            type: 'incoming',
            products: formartedProducts.map((p) => ({
              id: p.id,
              quantity: p.stock,
            })),
          },
          { session }
        );
      }

      await session.commitTransaction();
      return result;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }

  private ValidateInputContent(content: iRegisterProductUsecase.Input, { notificationError }) {
    ObjectManager.hasKeysWithNotification<iRegisterProductUsecase.Input>(['products', 'user_id'], content, notificationError);

    ObjectManager.hasKeysWithNotification<iRegisterProductUsecase.ProductContent>(['name', 'sale_price', 'stock'], content.products, notificationError);

    notificationError.CheckToNextStep();
  }

  private async ValidateProductContent(products: Array<iRegisterProductUsecase.ProductContent>, { session, notificationError }) {
    for (let iIndex = 0; iIndex < products.length; iIndex++) {
      const product = products[iIndex];

      const isDuplicatedInDatabase = await this.productRepository.isDuplicatedProduct(product, { session });

      console.log({ isDuplicatedInDatabase });

      if (isDuplicatedInDatabase) {
        notificationError.AddNotification({
          key: 'name',
          message: `Product at ${iIndex + 1}º ${product.name} is already registered`,
        });
      }

      const conditionDuplication = {
        isEqualName: (p) => p.name === product.name,
        isEqualPrice: (p) => p.sale_price === product.sale_price,
      };

      for (let sIndex = 0; sIndex < products.length; sIndex++) {
        const incoming_product_array = products[sIndex];

        if (sIndex === iIndex) break;

        if (conditionDuplication.isEqualName(incoming_product_array)) {
          notificationError.AddNotification({
            key: 'name',
            message: `Product at ${sIndex}º ${incoming_product_array.name} is duplicated in array`,
          });
        }

        continue;
      }
    }

    notificationError.CheckToNextStep();
  }
}
