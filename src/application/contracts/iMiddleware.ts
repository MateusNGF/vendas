import { HttpRequest, HttpResponse } from '../helpers/http';
import { HTTPHandlerReturns } from './HttpHandlersReturn';

export abstract class iMiddleware extends HTTPHandlerReturns {
  abstract run(request: HttpRequest): Promise<HttpResponse>;
}
