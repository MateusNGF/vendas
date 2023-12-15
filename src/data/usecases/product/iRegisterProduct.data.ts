import { iDatabaseDriver } from 'src/infra/database/contracts';
import { ProductEntity } from '../../../domain/entities';
import { OperationFailed } from '../../../domain/errors';
import { iRegisterProductUsecase } from '../../../domain/usecases/product';
import { iProductRepository } from '../../../infra/database/contracts/repositorys/iProduct.repository';
import { INotificationErrorManager } from '../../../domain/contracts';
import { ObjectManager, generateID } from '../../../domain/utils';
import { iCreateTransactionUsecase } from '../../../domain/usecases/transaction/iCreateTransaction.usecase';

export class RegisterProductData implements iRegisterProductUsecase {
  constructor(
    private readonly databaseSession: iDatabaseDriver.iSessionManager,
    private readonly notificationErrorHandler: INotificationErrorManager,
    private readonly productRepository: iProductRepository,
    private readonly createTransactionUsecase: iCreateTransactionUsecase
  ) { }

  async exec(
    input: iRegisterProductUsecase.Input,
    options: iRegisterProductUsecase.Options
  ): Promise<iRegisterProductUsecase.Output> {

    const session = await this.databaseSession.createSession();
    
    session.startTransaction()

    try {
      const products = input.products;

      this.ValidateInputContent(input)
      await this.ValidateProductContent(products, { session })

      const formartedProducts = products.map((product) => {
        return new ProductEntity({
          id: generateID(),
          name: product.name,
          sale_price: product.sale_price,
          stock: product.stock,
          created_by: input.user_id
        });
      })

      const resultRegisterInDatabase = await this.productRepository.registerProduct(formartedProducts, { session });
      if (!resultRegisterInDatabase) {
        throw new OperationFailed("Product registration failed. Try again.");
      }

      const result: iRegisterProductUsecase.Output = {
        productsIds: formartedProducts.map(p => p.id),
        transaction: null
      }

      

      if (options?.createTransaction) {
        result.transaction = await this.createTransactionUsecase.exec({
          user_id: input.user_id,
          type: 'incoming',
          products: formartedProducts.map(p => ({
            id: p.id,
            quantity: p.stock,
          })),
        }, { session })
      }

      await session.commitTransaction()

      return result

    } catch (error) {
      await session.abortTransaction()
      throw error
    } finally {
      await session.endSession()
    }
  }


  private ValidateInputContent(content: iRegisterProductUsecase.Input) {

    ObjectManager.hasKeysWithNotification<iRegisterProductUsecase.Input>(
      ['products', 'user_id'],
      content,
      this.notificationErrorHandler
    );


    ObjectManager.hasKeysWithNotification<iRegisterProductUsecase.ProductContent>(
      ['name', 'sale_price', 'stock'],
      content.products,
      this.notificationErrorHandler
    );

    this.notificationErrorHandler.CheckToNextStep();
  }

  private async ValidateProductContent(products, { session }) {
    products.forEach(async (product, index) => {
      const isDuplicatedInDatabase = await this.productRepository.isDuplicatedProduct(product, { session });

      if (isDuplicatedInDatabase) {
        this.notificationErrorHandler.AddNotification({
          key: "name",
          message: `Product at ${index}º ${product.name} is already registered`
        })
      }

      const conditionDuplication = {
        isEqualName: (p) => p.name === product.name,
        isEqualPrice: (p) => p.sale_price === product.sale_price
      }

      products.forEach((product, _index) => {
        if (_index === index) return;

        if (
          !conditionDuplication.isEqualName(product) &&
          !conditionDuplication.isEqualPrice(product)) {
          return
        }

        this.notificationErrorHandler.AddNotification({
          key: "name; price",
          message: `Product at ${index}º ${product.name} is duplicated in array`
        })
      })
    });

    this.notificationErrorHandler.CheckToNextStep()
  }
}
