export interface iUsecase {
  exec(input: any, ...args: any[]): Promise<any>;
}
