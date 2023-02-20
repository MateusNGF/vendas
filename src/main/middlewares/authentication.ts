import { adaptExpressMiddleware } from '../adapters/express-middleware';
import { makeMiddlewareAuthentication } from '../factories/application/middlewares/authentication.middleware.factory';

export function requestAuthorization() {
  return adaptExpressMiddleware(makeMiddlewareAuthentication());
}
