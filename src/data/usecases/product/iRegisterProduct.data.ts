import { ProductEntity } from '../../../domain/entities';
import { OperationFailed } from '../../../domain/errors';
import { iRegisterProductUsecase } from '../../../domain/usecases/product';
import { iProductRepository } from '../../../infra/database/contracts/repositorys/iProduct.repository';

export class RegisterProductData implements iRegisterProductUsecase {
  constructor(private readonly productRepository: iProductRepository) {}

  async exec(
    input: iRegisterProductUsecase.Input
  ): Promise<iRegisterProductUsecase.Output> {
    const incomingProduct: ProductEntity = input;

    const isDuplicated = await this.productRepository.validDuplicatedProduct(
      incomingProduct
    );
    if (isDuplicated)
      throw new OperationFailed(
        `Product ${incomingProduct.name} is already registered`
      );

    const product = new ProductEntity({
      name: incomingProduct.name,
      sale_price: incomingProduct.sale_price,
      stock: incomingProduct.stock,
      created_by: incomingProduct.created_by,
    });

    const { id } = await this.productRepository.create(product);
    if (!id) throw new OperationFailed('Error in register product.');

    return { id };
  }
}
