import { AuthorizationMiddleware } from '../../../../application/middlewares/authorization.middleware';
import { iMiddleware } from '../../../../application/contracts/iMiddleware';
import { AuthenticationMiddleware } from '../../../../application/middlewares';
import { iTokenAdapter } from '../../../../infra/cryptography/contracts';
import { makeTokenAdapter } from '../../infra/cryptography';

export const makeMiddlewareAuthentication = (): iMiddleware => {
  const tokenAdapter: iTokenAdapter = makeTokenAdapter();
  return new AuthenticationMiddleware(tokenAdapter);
};

export const makeMiddlewareAuthorization = (necessaryLevel : number) : iMiddleware => {
  return new AuthorizationMiddleware(necessaryLevel)
}
