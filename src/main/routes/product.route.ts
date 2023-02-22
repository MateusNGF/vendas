import { Router } from 'express';
import { PERMISSION } from '../../domain/types';
import { adaptExpressMiddleware } from '../adapters/express-middleware';
import { adaptExpressRoute } from '../adapters/express-route';
import { makeListProductController, makeArchiveOrUnarchiveProductController, makeRegisterProductController } from '../factories/application/controllers/product.factory';
import { makeMiddlewareAuthentication, makeMiddlewareAuthorization } from '../factories/application/middlewares/authentication.middleware.factory';

export default (router: Router): void => {
  router.post(
    '/register',
    adaptExpressMiddleware(makeMiddlewareAuthentication()),
    adaptExpressMiddleware(makeMiddlewareAuthorization(PERMISSION.ADM)),
    adaptExpressRoute(makeRegisterProductController())
  );

  router.put(
    '/au/:action/:productId',
    adaptExpressMiddleware(makeMiddlewareAuthentication()),
    adaptExpressMiddleware(makeMiddlewareAuthorization(PERMISSION.ADM)),
    adaptExpressRoute(makeArchiveOrUnarchiveProductController())
  )

  router.get(
    '/list/filter',
    adaptExpressMiddleware(makeMiddlewareAuthentication()),
    adaptExpressMiddleware(makeMiddlewareAuthorization(PERMISSION.USR)),
    adaptExpressRoute(makeListProductController())
  )

};
