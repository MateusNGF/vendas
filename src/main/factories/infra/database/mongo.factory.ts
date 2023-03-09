import { Db } from 'mongodb';
import { AuthEntity, ProductEntity, UserEntity } from 'src/domain/entities';
import { iAuthenticateRepository } from 'src/infra/database/contracts/repositorys/iAuthenticate.repository';
import {
  AuthenticateRepository,
  CompanyRepository,
  ProductRepository,
} from '../../../../infra/database/mongodb/repositorys';
import { MongoDB } from '../../../../../src/infra/database/mongodb';
import { iUserRepository } from 'src/infra/database/contracts/repositorys/iUser.repository';
import { UserRepository } from '../../../../infra/database/mongodb/repositorys/user.repository';
import { iProductRepository } from '../../../../infra/database/contracts/repositorys/iProduct.repository';
import { iTransactionRepository } from '../../../../infra/database/contracts/repositorys/iTransaction.repository';
import { TransactionEntity } from '../../../../domain/entities/transaction.entity';
import { TransactionRepository } from '../../../../infra/database/mongodb/repositorys/transaction.repository';
import { iDatabase } from '../../../../infra/database/contracts';
import { iCompanyRepository } from 'src/infra/database/contracts/repositorys/iCompany.repository';
import { CompanyEntity } from 'src/domain/entities/company.entity';

const getConnection = (): Db => {
  return MongoDB.getDatabase();
};

export const makeSessionDatabase = (): iDatabase.iSession => {
  return MongoDB.createSession();
};

export const makeAuthenticateRepository = (): iAuthenticateRepository => {
  const database = getConnection();
  const authenticateColletion =
    database.collection<AuthEntity>('authenticates');

  return new AuthenticateRepository(database, authenticateColletion);
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

export const makeCompanyRepository = (): iCompanyRepository => {
  const database = getConnection();
  const companyRepository = database.collection<CompanyEntity>('companies');

  return new CompanyRepository(companyRepository);
};
