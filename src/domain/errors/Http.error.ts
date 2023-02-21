import { HTTP_STATUS } from '../types/Http.status';
import { CUSTOM_ERROR } from './Custom.error';

export abstract class HTTP_ERROR extends CUSTOM_ERROR {
  code: number;
  message: string;
}

export class UnauthorizedError extends HTTP_ERROR {
  name = 'Unauthorized Error';
  code = HTTP_STATUS.UNAUTHORIZED;

  constructor(menssage: string = 'Request Denied.') {
    super();
    this.message = menssage;
  }
}

export class ForbiddenError extends HTTP_ERROR {
  name = 'Forbidden Error';
  code = HTTP_STATUS.FORBIDDEN;

  constructor(menssage: string = 'Request denied.') {
    super();
    this.message = menssage;
  }
}

export class BadRequestError extends HTTP_ERROR {
  name = 'BadRequest Error';
  code = HTTP_STATUS.BAD_REQUEST;

  constructor(menssage: string = 'Request Failed.') {
    super();
    this.message = menssage;
  }
}

export class InternalError extends Error {
  name = 'InternalError';
  code = HTTP_STATUS.INTERNAL_SERVER_ERROR;
  constructor(message: string = 'Internal Error. Try later.') {
    super();
    this.message = message;
  }
}
