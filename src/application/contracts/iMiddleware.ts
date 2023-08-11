import { HTTPError } from '../../../src/domain/errors';
import { HttpRequest, HttpResponse } from '../helpers/http';

export abstract class iMiddleware {
  abstract run(request: HttpRequest): Promise<HttpResponse>;

  protected sendSucess(data: any, status = 200): HttpResponse {
    return { status, data };
  }

  protected sendError(error: any): HttpResponse<{ message: string }> {
    if (error instanceof HTTPError) {
      return makeBodyResponseError(
        error.code ? error.code : 400,
        error.message
      );
    } else {
      console.error('Middleware : ', error);
      return makeBodyResponseError(500, 'Request denied.');
    }
  }
}

const makeBodyResponseError = (status: any, message: any) => {
  return { status: status, data: { message } };
};
