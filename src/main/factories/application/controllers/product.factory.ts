import { iController } from "../../../../application/contracts";
import { ListProductController } from "../../../../application/controllers/product/ListProduct.controller";
import { ArchiveOrUnarchiveProductController, RegisterProductController } from "../../../../application/controllers/product";
import { makeArchiveOrUnarchiveProductUsecase, makeListProductUsecase, makeRegisterProductUsecase } from "../usecases/product.factory";

export function  makeRegisterProductController() : iController {
    return new RegisterProductController(
        makeRegisterProductUsecase()
    )
}

export function  makeArchiveOrUnarchiveProductController() : iController {
    return new ArchiveOrUnarchiveProductController(
        makeArchiveOrUnarchiveProductUsecase()
    )
}

export function  makeListProductController() : iController {
    return new ListProductController(
        makeListProductUsecase()
    )
}