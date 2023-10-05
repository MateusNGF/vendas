import { HTTP_STATUS } from '../../domain/types/Http.status';
import { UnauthorizedError } from '../../domain/errors';
import { PayloadToken } from '../../domain/types';
import { iTokenAdapter } from '../../infra/cryptography/contracts';
import { iMiddleware } from '../contracts/iMiddleware';
import { HttpRequest, HttpResponse } from '../helpers/http';

export class AuthenticationMiddleware extends iMiddleware {
  constructor(private readonly tokenAdapter: iTokenAdapter) {
    super();
  }

  async run(request: HttpRequest): Promise<HttpResponse> {
    const token = request.headers['x-access-token'];
    const content: HttpRequest.Headers = { decodedTokenUser : null }

    try {
      if (!token) throw new UnauthorizedError('Token required.');

      content.decodedTokenUser = await this.tokenAdapter.verify<PayloadToken>(token);

      return this.sendSucess(HTTP_STATUS.OK, content);
    } catch (e) {
      return this.sendError(new UnauthorizedError(e.message));
    }
  }
}
