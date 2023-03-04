import { Router } from 'express';
import { PERMISSION } from '../../domain/types';
import { adaptExpressMiddleware } from '../adapters/express-middleware';
import { adaptExpressRoute } from '../adapters/express-route';
import { makeCreateTransactionController } from '../factories/application/controllers';
import { makeMiddlewareAuthentication, makeMiddlewareAuthorization } from '../factories/application/middlewares/authentication.middleware.factory';

export default (router: Router): void => {
  router.post(
    '/register',
    adaptExpressMiddleware(makeMiddlewareAuthentication()),
    adaptExpressMiddleware(makeMiddlewareAuthorization(PERMISSION.USR, { only_level : false })),
    adaptExpressRoute(makeCreateTransactionController())
  );
};
