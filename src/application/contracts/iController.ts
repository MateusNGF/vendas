import { HTTP_STATUS } from '../../../src/domain/types/Http.status';
import { CustomError, NotificationError } from '../../../src/domain/errors';
import { HttpRequest, HttpResponse } from '../helpers/http';

export abstract class iController {
  abstract exec<T = any>(request: HttpRequest): Promise<HttpResponse<T>>;

  protected sendError(error: any): HttpResponse<{ message: string }> {
    console.log(error)
    if (error instanceof CustomError) {
      return makeBodyResponseError(
        HTTP_STATUS.BAD_REQUEST,
        { message: error.message }
      );
    } else if (error instanceof NotificationError) {
      return makeBodyResponseError(
        HTTP_STATUS.BAD_REQUEST,
       { message : 'Some errors were found .', stack : error.notifications }
      );
    } else {
      return makeBodyResponseError(
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        { message : 'Internal Error. try later.' }
      );
    }
  }

  protected sendSucess(
    status:
      | HTTP_STATUS.OK
      | HTTP_STATUS.ACCEPTED
      | HTTP_STATUS.CREATED
      | HTTP_STATUS.CONTINUE,
    data?: any
  ): HttpResponse<any> {
    if (typeof data == 'string') {
      data = { message: data };
    }
    return {
      status: status || 200,
      data: { ok: 1, ...data } || null,
    };
  }
}

const makeBodyResponseError = (status: any, data: any) => {
  return { status: status, data };
};
