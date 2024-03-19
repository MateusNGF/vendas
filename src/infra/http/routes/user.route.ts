import { Router } from 'express';
import { adaptExpressMiddleware } from '../../../main/adapters/express-middleware';
import { adaptExpressRoute } from '../../../main/adapters/express-route';
import {
  makeSignInAccountUserController,
  makeSignUpAccountUserController,
  makeGetAccountUserController,
} from '../../../main/factories/application/controllers/user.factory';
import { makeMiddlewareAuthentication } from '../../../main/factories/application/middlewares/authentication.middleware.factory';

export default (router: Router): void => {
  router.post(
    '/signup',
    adaptExpressRoute(makeSignUpAccountUserController())
  );

  router.post(
    '/signin',
    adaptExpressRoute(makeSignInAccountUserController())
  );

  router.get(
    '/account',
    adaptExpressMiddleware(makeMiddlewareAuthentication()),
    adaptExpressRoute(makeGetAccountUserController())
  );
};
