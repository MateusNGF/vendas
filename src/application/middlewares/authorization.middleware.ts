import { PayloadToken } from 'src/domain/types';
import { ForbiddenError, UnauthorizedError } from '../../domain/errors';
import { iMiddleware } from '../contracts/iMiddleware';
import { HttpRequest, HttpResponse } from '../helpers/http';
import { HTTP_STATUS } from '../../domain/types/Http.status';

export class AuthorizationMiddleware extends iMiddleware {
  constructor(private readonly necessary_level: number, private readonly options?: AuthorizationMiddleware.Options) {
    super();
  }

  async run(request: HttpRequest): Promise<HttpResponse> {
    const decodedTokenUser = request.headers.decodedTokenUser;
    try {
      if (!decodedTokenUser) throw new UnauthorizedError('Required authentication.');

      if (this.options) {
        this.options.only_level && this.onlyAccessLevelValidation(decodedTokenUser);
      } else {
        this.defaultValidation(decodedTokenUser);
      }

      return this.sendSucess(HTTP_STATUS.OK, {});
    } catch (e) {
      return this.sendError(e);
    }
  }

  private defaultValidation(decodedTokenUser: PayloadToken) {
    if (decodedTokenUser.access_level < this.necessary_level) throw new ForbiddenError('Access level not enough.');
  }

  private onlyAccessLevelValidation(decodedTokenUser: PayloadToken) {
    if (decodedTokenUser.access_level != this.necessary_level) throw new ForbiddenError();
  }
}

export namespace AuthorizationMiddleware {
  export abstract class Options {
    only_level: boolean;
  }
}
