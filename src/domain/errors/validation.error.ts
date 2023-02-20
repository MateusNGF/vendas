import { BadRequestError } from './Http.error';

export class MissingParamError extends BadRequestError {
  name: string = 'Missing Param';

  constructor(param) {
    super(`The param '${param}' is required.`);
  }
}

export class UnexpectedParamError extends BadRequestError {
  name: string = 'Unexpected Param';

  constructor(param) {
    super(`The param '${param}' not is required.`);
  }
}

export class EmptyParamError extends BadRequestError {
  name: string = 'Empty Param';

  constructor(param) {
    super(`The param '${param}' can't be empty.`);
  }
}

export class TypeParamError extends BadRequestError {
  name: string = 'Type Param';

  constructor(param, type) {
    super(`The param '${param}' need to be ${type}.`);
  }
}
