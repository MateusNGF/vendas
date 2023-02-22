import { iListProductUsecase } from "src/domain/usecases/product";
import { iProductRepository } from "src/infra/database/contracts/repositorys/iProduct.repository";

export class ListProduct implements iListProductUsecase {
    
    constructor(
        private readonly productRepository : iProductRepository
    ){}

    exec(input: iListProductUsecase.Input): Promise<iListProductUsecase.Output> {
        return this.productRepository.listProduct({
            text : input.text
        })
    }
}