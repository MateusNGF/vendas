import { iController } from "src/application/contracts";
import { ArchiveOrUnarchiveProductController, RegisterProductController } from "../../../../application/controllers/product";
import { makeArchiveOrUnarchiveProductUsecase, makeRegisterProductUsecase } from "../usecases/product.factory";

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