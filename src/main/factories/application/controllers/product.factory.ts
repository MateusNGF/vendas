import { iController } from '../../../../application/contracts';
import { ListProductController } from '../../../../application/controllers/product/ListProduct.controller';
import {
  ArchiveOrUnarchiveProductController,
  RegisterProductController,
} from '../../../../application/controllers/product';
import {
  makeArchiveOrUnarchiveProductUsecase,
  makeListProductUsecase,
  makeRegisterProductUsecase,
} from '../usecases/product.factory';
import { NotificationHandlerArchiveOrUnarchiveProduct } from '../../main/errors';

export function makeRegisterProductController(): iController {
  return new RegisterProductController(makeRegisterProductUsecase());
}

export function makeArchiveOrUnarchiveProductController(): iController {
  return new ArchiveOrUnarchiveProductController(
    makeArchiveOrUnarchiveProductUsecase(),
    NotificationHandlerArchiveOrUnarchiveProduct()
  );
}

export function makeListProductController(): iController {
  return new ListProductController(makeListProductUsecase());
}
