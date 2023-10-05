import { Db } from 'mongodb';
import { AuthEntity, ProductEntity, UserEntity } from 'src/domain/entities';
import { iAuthenticateRepository } from 'src/infra/database/contracts/repositorys/iAuthenticate.repository';
import {
  AuthenticateRepository,
  ProductRepository,
} from '../../../../infra/database/mongodb/repositorys';
import { MongoDB } from '../../../../../src/infra/database/mongodb';
import { iUserRepository } from 'src/infra/database/contracts/repositorys/iUser.repository';
import { UserRepository } from '../../../../infra/database/mongodb/repositorys/user.repository';
import { iProductRepository } from '../../../../infra/database/contracts/repositorys/iProduct.repository';
import { iTransactionRepository } from '../../../../infra/database/contracts/repositorys/iTransaction.repository';
import { TransactionEntity } from '../../../../domain/entities/transaction.entity';
import { TransactionRepository } from '../../../../infra/database/mongodb/repositorys/transaction.repository';
import { iDatabase, iDatabaseCached } from '../../../../infra/database/contracts';
import { GetMemoryCached } from './redis.factory';

const getConnection = (): Db => {
  return MongoDB.getDatabase();
};

export const makeSessionDatabase = (): iDatabase.iSession => {
  return MongoDB.createSession();
};

export const makeAuthenticateRepository = (): iAuthenticateRepository => {
  const database = getConnection();
  const authenticateColletion = database.collection<AuthEntity>('authenticates');

  const memoryCache = GetMemoryCached({ 
    context: 'ATH',
  })

  return new AuthenticateRepository(database, authenticateColletion, memoryCache);
};

export const makeUserRepository = (): iUserRepository => {
  const database = getConnection();
  const userRepository = database.collection<UserEntity>('users');

  return new UserRepository(
    database,
    userRepository,
    makeAuthenticateRepository()
  );
};

export const makeProductRepository = (): iProductRepository => {
  const database = getConnection();
  const productRepository = database.collection<ProductEntity>('products');

  return new ProductRepository(database, productRepository);
};

export const makeTransactionRepository = (): iTransactionRepository => {
  const database = getConnection();
  const transactionRepository =
    database.collection<TransactionEntity>('transactions');

  return new TransactionRepository(transactionRepository);
};
