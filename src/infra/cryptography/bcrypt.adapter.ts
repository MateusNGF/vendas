import { compare, hash } from 'bcrypt';
import { iHashAdapter } from './contracts';

export class BcryptAdapter implements iHashAdapter {
  constructor(private readonly salt: number) {}

  encrypt(text: string): Promise<any> {
    return Promise.resolve(hash(text, this.salt));
  }

  compare(hash_one: string, hash_two: string): Promise<boolean> {
    return compare(hash_one, hash_two);
  }
}
