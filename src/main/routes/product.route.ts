import { Router } from 'express';
import { adaptExpressMiddleware } from '../adapters/express-middleware';
import { adaptExpressRoute } from '../adapters/express-route';
import { makeArchiveOrUnarchiveProductController, makeRegisterProductController } from '../factories/application/controllers/product.factory';
import { makeMiddlewareAuthentication } from '../factories/application/middlewares/authentication.middleware.factory';

export default (router: Router): void => {
  router.post(
    '/register',
    adaptExpressMiddleware(makeMiddlewareAuthentication()),
    adaptExpressRoute(makeRegisterProductController())
  );

  router.put(
    '/au/:action/:productId',
    adaptExpressMiddleware(makeMiddlewareAuthentication()),
    adaptExpressRoute(makeArchiveOrUnarchiveProductController())
  )
};
