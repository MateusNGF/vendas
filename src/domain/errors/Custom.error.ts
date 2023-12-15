export abstract class CustomError extends Error {
  code: number;
}

export class GenericError extends CustomError {
  name = 'Generic Error';
  constructor(message: string) {
    super(message);
  }
}

export class OperationFailed extends CustomError {
  name = 'Operation Failed';
  code = SYSTEM_CODE_ERRORS.OPERATION_FAILED;
  constructor(message = 'Operation failed') {
    super(message);
  }
}

export class InternalError extends CustomError {
  name = 'Internal Error';
  code = SYSTEM_CODE_ERRORS.INTERNAL_ERROR;
  constructor(message = 'Internal Error') {
    super(message);
  }
}

export enum SYSTEM_CODE_ERRORS {
  OPERATION_FAILED = 1, // Database not create or update, ....
  INTERNAL_ERROR = 2, // Error of framework, node ....
}
