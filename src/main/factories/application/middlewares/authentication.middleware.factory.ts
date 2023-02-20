import { iMiddleware } from '../../../../application/contracts/iMiddleware';
import { AuthenticationMiddleware } from '../../../../application/middlewares';
import { iTokenAdapter } from '../../../../infra/cryptography/contracts';
import { makeTokenAdapter } from '../../infra/cryptography';

export const makeMiddlewareAuthentication = (): iMiddleware => {
  const tokenAdapter: iTokenAdapter = makeTokenAdapter();
  return new AuthenticationMiddleware(tokenAdapter);
};
