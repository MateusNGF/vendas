import { HttpRequest, HttpResponse } from '../helpers/http';
import { HTTPHandlerReturns } from './HttpHandlersReturn';

export abstract class iController extends HTTPHandlerReturns {
  abstract exec<T = any>(request: HttpRequest): Promise<HttpResponse<T>>;
}
