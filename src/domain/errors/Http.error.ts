import { HTTP_STATUS } from '../types/Http.status';
import { CustomError } from './Custom.error';

export abstract class HTTPError extends CustomError {
  code: number;
  message: string;
}

export class UnauthorizedError extends HTTPError {
  name = 'Unauthorized Error';
  code = HTTP_STATUS.UNAUTHORIZED;

  constructor(message: string = 'Request Denied.') {
    super(message);
  }
}

export class ForbiddenError extends HTTPError {
  name = 'Forbidden Error';
  code = HTTP_STATUS.FORBIDDEN;

  constructor(message: string = 'Request denied.') {
    super(message);
  }
}

export class BadRequestError extends HTTPError {
  name = 'BadRequest Error';
  code = HTTP_STATUS.BAD_REQUEST;

  constructor(message: string = 'Request Failed.') {
    super(message);
  }
}
