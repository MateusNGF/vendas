import { TransactionEntity } from '../../../domain/entities/transaction.entity';
import { BadRequestError } from '../../../domain/errors';
import { iCreateIncomingTransactionForProductsUsecase } from 'src/domain/usecases/transaction/iCreateTransaction.usecase';
import { iDatabase } from 'src/infra/database/contracts';
import { iProductRepository } from 'src/infra/database/contracts/repositorys/iProduct.repository';
import { iTransactionRepository } from 'src/infra/database/contracts/repositorys/iTransaction.repository';
import { iUserRepository } from 'src/infra/database/contracts/repositorys/iUser.repository';
import { Writeable } from 'src/domain/utils';
import { ProductEntity } from 'src/domain/entities';

export class CreateIncomingTransactionForProductsData
  implements iCreateIncomingTransactionForProductsUsecase {
  constructor(
    private readonly userRepository: iUserRepository,
    private readonly productRepository: iProductRepository,
    private readonly transactionRepository: iTransactionRepository
  ) { }
  async exec(
    input: iCreateIncomingTransactionForProductsUsecase.Input,
    settings?: iCreateIncomingTransactionForProductsUsecase.Settings
  ) {
    const session = settings && settings.session ? settings.session : null;

    const { buyer_id, products_sold} = input;

    const buyer_content = await this.userRepository.findById(buyer_id, { session });

    if (!buyer_content) 
      throw new BadRequestError(`buyer with id ${buyer_id} not found.`);

    let transactionPartial: Writeable<TransactionEntity> = {
      type: 'incoming',
      products: [],
      buyer_id,
      total_price: 0,
    };

    for (let i = 0; i < products_sold.length; i++) {

      const productBasic: TransactionEntity.ProductContentTransaction = products_sold[i];
      
      const productContent = await this.productRepository.productOutput(productBasic, { session });

      if (!productContent)
        throw new BadRequestError(`Operation failed because it was not possible to update product with id : ${productBasic.id}`);

      const subtotal_this_product = productContent.sale_price * productBasic.quantity

      transactionPartial.products.push({
        id: productContent.id,
        name: productContent.name,
        sale_price: productContent.sale_price,
        quantity: productBasic.quantity,
        subtotal: subtotal_this_product
      });

      transactionPartial.total_price += Number(subtotal_this_product);
    }

    const transaction = new TransactionEntity(transactionPartial);

    const result = await this.transactionRepository.create(transaction, { session });

    if (!result || !result.id) return null;

    return {
      id: result.id,
      created_at: transaction.created_at,
    };
  }
}
