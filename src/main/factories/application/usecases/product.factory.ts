import { ArchiveOrUnarchiveProductData } from "../../../../data/usecases/product/iArchiveOrUnarchiveProduct.data";
import { RegisterProductData } from "../../../../data/usecases/product/iRegisterProduct.data";
import { iArchiveOrUnarchiveProductUsecase, iListProductUsecase, iRegisterProductUsecase } from "../../../../domain/usecases/product";
import { makeProductRepository } from "../../infra/database/mongo.factory";
import { ListProductData } from "../../../../data/usecases/product/iListProduct.data";

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

export function makeListProductUsecase() : iListProductUsecase {
    return new ListProductData(
        makeProductRepository()
    )
}