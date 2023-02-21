import { ArchiveOrUnarchiveProductData } from "../../../../data/usecases/product/iArchiveOrUnarchiveProduct.data";
import { RegisterProductData } from "../../../../data/usecases/product/iRegisterProduct.data";
import { iArchiveOrUnarchiveProductUsecase, iRegisterProductUsecase } from "src/domain/usecases/product";
import { makeProductRepository } from "../../infra/database/mongo.factory";

export function makeRegisterProductUsecase() : iRegisterProductUsecase {
    return new RegisterProductData(
        makeProductRepository()
    )
}

export function makeArchiveOrUnarchiveProductUsecase() : iArchiveOrUnarchiveProductUsecase {
    return new ArchiveOrUnarchiveProductData(
        makeProductRepository()
    )
}