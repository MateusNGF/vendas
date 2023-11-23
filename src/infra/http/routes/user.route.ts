import { Router } from 'express';
import { adaptExpressMiddleware } from '../../../main/adapters/express-middleware';
import { adaptExpressRoute } from '../../../main/adapters/express-route';
import {
  makeAccessAccountUserController,
  makeCreateAccountUserController,
  makeGetAccountUserController,
} from '../../../main/factories/application/controllers/user.factory';
import { makeMiddlewareAuthentication } from '../../../main/factories/application/middlewares/authentication.middleware.factory';

export default (router: Router): void => {
  router.post(
    '/register',
    adaptExpressRoute(makeCreateAccountUserController())
  );

  router.post('/access', adaptExpressRoute(makeAccessAccountUserController()));

  router.get(
    '/account',
    adaptExpressMiddleware(makeMiddlewareAuthentication()),
    adaptExpressRoute(makeGetAccountUserController())
  );
};
