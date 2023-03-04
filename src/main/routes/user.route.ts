import { Router } from 'express';
import { adaptExpressMiddleware } from '../adapters/express-middleware';
import { adaptExpressRoute } from '../adapters/express-route';
import {
  makeAccessAccountUserController,
  makeCreateAccountUserController,
  makeGetAccountUserController,
} from '../factories/application/controllers/user.factory';
import { makeMiddlewareAuthentication } from '../factories/application/middlewares/authentication.middleware.factory';

export default (router: Router): void => {
  router.post(
    '/register',
    adaptExpressRoute(makeCreateAccountUserController())
  );

  router.get('/access', adaptExpressRoute(makeAccessAccountUserController()));

  router.get(
    '/account',
    adaptExpressMiddleware(makeMiddlewareAuthentication()),
    adaptExpressRoute(makeGetAccountUserController())
  );
};
