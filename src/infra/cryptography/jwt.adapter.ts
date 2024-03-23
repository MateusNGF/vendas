import jwt from 'jsonwebtoken';
import { iTokenAdapter } from './contracts';

export class JWTAdapter implements iTokenAdapter {
  constructor(private readonly secrectKey: string = process.env.JWT_PW_DEFAULT, private readonly expiresIn: string = process.env.JWT_EXPIRE_DEFAULT) {}

  async sing(content: any, options?: iTokenAdapter.options): Promise<string> {
    return jwt.sign(content, options?.secretKey ?? this.secrectKey, {
      expiresIn: options?.expireIn ?? this.expiresIn,
    });
  }

  async verify(hash: string, secret = this.secrectKey): Promise<any> {
    return jwt.verify(hash, secret);
  }
}
