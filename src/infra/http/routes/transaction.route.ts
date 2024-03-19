import { Router } from 'express';
import { SYSTEM_PERMISSION } from '../../../domain/constanst';
import { adaptExpressMiddleware } from '../../../main/adapters/express-middleware';
import { adaptExpressRoute } from '../../../main/adapters/express-route';
import { makeCreateTransactionController } from '../../../main/factories/application/controllers';
import {
  makeMiddlewareAuthentication,
  makeMiddlewareAuthorization,
} from '../../../main/factories/application/middlewares/authentication.middleware.factory';

export default (router: Router): void => {
  router.post(
    '/register',
    adaptExpressMiddleware(makeMiddlewareAuthentication()),
    adaptExpressMiddleware(
      makeMiddlewareAuthorization(SYSTEM_PERMISSION.USR, { only_level: false })
    ),
    adaptExpressRoute(makeCreateTransactionController())
  );
};
