export interface iTokenAdapter {
  sing<T = any>(content: T, options?: iTokenAdapter.options): Promise<string>;
  verify<T = any>(hash: string, secret?: string): Promise<T>;
}

export namespace iTokenAdapter {
  export type options = {
    secretKey?: string;
    expireIn?: string;
  };
}
