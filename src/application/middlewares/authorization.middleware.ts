import { ForbiddenError, UnauthorizedError } from '../../domain/errors';
import { iMiddleware } from '../contracts/iMiddleware';
import { HttpRequest, HttpResponse } from '../helpers/http';

export class AuthorizationMiddleware extends iMiddleware {
  constructor(
    private readonly necessary_level : number
  ) {
    super();
  }

  async run(request: HttpRequest): Promise<HttpResponse> {
    const decodedTokenUser = request.headers.decodedTokenUser;
    try {
      if (!decodedTokenUser) throw new UnauthorizedError('Required authentication.');
      if (decodedTokenUser.access_level < this.necessary_level) throw new ForbiddenError()
      return this.sendSucess({});
    } catch (e) {
      return this.sendError(new UnauthorizedError(e.message));
    }
  }
}
