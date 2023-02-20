import { UnauthorizedError } from 'src/domain/errors';
import { PayloadToken } from 'src/domain/types';
import { iTokenAdapter } from 'src/infra/cryptography/contracts';
import { iMiddleware } from '../contracts/iMiddleware';
import { HttpRequest, HttpResponse } from '../helpers/http';

export class AuthenticationMiddleware extends iMiddleware {
  constructor(private readonly tokenAdapter: iTokenAdapter) {
    super();
  }

  async run(request: HttpRequest): Promise<HttpResponse> {
    const token = request.headers['x-access-token'];
    try {
      if (!token) throw new UnauthorizedError('Token required.');
      const payload = await this.tokenAdapter.verify<PayloadToken>(token);
      console.log('payload', payload);
      return this.sendSucess({ decodedTokenCompany: payload });
    } catch (e) {
      return this.sendError(new UnauthorizedError(e.message));
    }
  }
}
