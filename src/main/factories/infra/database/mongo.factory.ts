import { Collection, Db } from 'mongodb';
import { AuthEntity, ProductEntity, UserEntity } from '../../../../domain/entities';
import { iAuthenticateRepository } from '../../../../infra/database/contracts/repositorys/iAuthenticate.repository';
import { AuthenticateRepository, ProductRepository } from '../../../../infra/database/mongodb/repositorys';
import { DatabaseDriver } from '../../../../infra/database/mongodb';
import { iUserRepository } from '../../../../infra/database/contracts/repositorys/iUser.repository';
import { UserRepository } from '../../../../infra/database/mongodb/repositorys/user.repository';
import { iProductRepository } from '../../../../infra/database/contracts/repositorys/iProduct.repository';
import { iTransactionRepository } from '../../../../infra/database/contracts/repositorys/iTransaction.repository';
import { TransactionEntity } from '../../../../domain/entities/transaction.entity';
import { TransactionRepository } from '../../../../infra/database/mongodb/repositorys/transaction.repository';
import { iDatabaseDriver } from '../../../../infra/database/contracts';
import { GetMemoryCached } from './redis.factory';
import { iCompanyRepository } from '../../../../infra/database/contracts/repositorys/iCompany.repository';
import { CompanyRepository } from '../../../../infra/database/mongodb/repositorys/company.repository';
import { CompanyEntity } from '../../../../domain/entities/company.entity';

const getConnection = (): Db => {
  return DatabaseDriver.getDatabase();
};

export const makeSessionManagerDatabase = (): iDatabaseDriver.iSessionManager => {
  return DatabaseDriver.getSession();
};

export const makeAuthenticateRepository = (): iAuthenticateRepository => {
  const database = getConnection();
  const authenticateColletion = database.collection<AuthEntity>('authenticates');

  const memoryCache = GetMemoryCached({
    context: 'ATH',
  });

  return new AuthenticateRepository(database, authenticateColletion, memoryCache);
};

export const makeUserRepository = (): iUserRepository => {
  const database = getConnection();
  const userRepository = database.collection<UserEntity>('users');

  return new UserRepository(database, userRepository, makeAuthenticateRepository());
};

export const makeCompanyRepository = (): iCompanyRepository => {
  const database = getConnection();
  const companyRepository = database.collection<CompanyEntity>('companies');

  const memoryCache = GetMemoryCached({
    context: 'COMPANY',
  });

  return new CompanyRepository(companyRepository, memoryCache);
};

export const makeProductRepository = (): iProductRepository => {
  const database = getConnection();
  const productRepository = database.collection<ProductEntity>('products');

  return new ProductRepository(database, productRepository);
};

export const makeTransactionRepository = (): iTransactionRepository => {
  const database = getConnection();
  const transactionRepository = database.collection<TransactionEntity>('transactions');

  return new TransactionRepository(transactionRepository);
};
