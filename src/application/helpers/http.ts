import { PayloadToken } from '../../domain/types';

export type HttpRequest = {
  body?: any;
  params?: any;
  headers?: HttpRequest.Headers;
  query?: any;
};
export type HttpResponse<T = any> = {
  status: number;
  data: T;
};

export namespace HttpRequest {
  export type Headers = {
    decodedTokenUser: PayloadToken;
  };
}
