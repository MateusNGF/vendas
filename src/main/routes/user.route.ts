import { Router } from 'express';
import { adaptExpressRoute } from '../adapters/express-route';
import { makeAccessAccountUserController, makeCreateAccountUserController } from '../factories/application/controllers/user.factory';

export default (router: Router): void => {
  router.post(
    '/register',
    adaptExpressRoute(makeCreateAccountUserController())
  );

  router.get(
    '/access',
    adaptExpressRoute(makeAccessAccountUserController())
  )
};
