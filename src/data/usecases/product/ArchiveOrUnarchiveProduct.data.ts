import { iArchiveOrUnarchiveProductUsecase } from 'src/domain/usecases/product';
import { iProductRepository } from 'src/infra/database/contracts/repositorys/iProduct.repository';

export class ArchiveOrUnarchiveProductData implements iArchiveOrUnarchiveProductUsecase {
  constructor(private readonly productRepository: iProductRepository) {}
  exec(input: iArchiveOrUnarchiveProductUsecase.Input): Promise<boolean> {
    switch (input.action) {
      case 'archive':
        return this.archiveProduct(input);
      case 'unarchive':
        return this.unarchiveProduct(input);
      default:
        return Promise.resolve(false);
    }
  }

  private archiveProduct(input: iArchiveOrUnarchiveProductUsecase.Input) {
    return this.productRepository.archiveProduct(input.product_id);
  }

  private unarchiveProduct(input: iArchiveOrUnarchiveProductUsecase.Input) {
    return this.productRepository.unarchiveProduct(input.product_id);
  }
}
