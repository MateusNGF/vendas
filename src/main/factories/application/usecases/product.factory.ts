import { ArchiveOrUnarchiveProductData } from '../../../../data/usecases/product/iArchiveOrUnarchiveProduct.data';
import { RegisterProductData } from '../../../../data/usecases/product/iRegisterProduct.data';
import {
  iArchiveOrUnarchiveProductUsecase,
  iListProductUsecase,
  iRegisterProductUsecase,
  iRemoveProductUsecase,
} from '../../../../domain/usecases/product';
import { makeProductRepository } from '../../infra/database/mongo.factory';
import { ListProductData } from '../../../../data/usecases/product/iListProduct.data';
import { RemoveProductData } from '../../../../data/usecases/product/iRemoveProduct.data';
import { DatabaseDriver } from '../../../../infra/database/mongodb';
import { NotificationHandlerRegisterProduct } from '../../main/errors';
import { makeCreateTransactionUsecase } from './transaction.factory';

export function makeRegisterProductUsecase(): iRegisterProductUsecase {
  return new RegisterProductData(
    DatabaseDriver.getSession(),
    NotificationHandlerRegisterProduct(),
    makeProductRepository(),
    makeCreateTransactionUsecase()
  );
}

export function makeRemoveProductUsecase(): iRemoveProductUsecase {
  return new RemoveProductData(
    makeProductRepository(),
    makeCreateTransactionUsecase(),
    NotificationHandlerRegisterProduct(),
    DatabaseDriver.getSession()
  );
}

export function makeArchiveOrUnarchiveProductUsecase(): iArchiveOrUnarchiveProductUsecase {
  return new ArchiveOrUnarchiveProductData(makeProductRepository());
}

export function makeListProductUsecase(): iListProductUsecase {
  return new ListProductData(makeProductRepository());
}
