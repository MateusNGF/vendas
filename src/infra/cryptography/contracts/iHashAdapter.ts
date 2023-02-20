export interface iHashAdapter {
  encrypt(text: string): Promise<any>;
  compare(hash: string, digest: string): Promise<boolean>;
}
