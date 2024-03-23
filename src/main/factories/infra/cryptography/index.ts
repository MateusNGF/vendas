import { BcryptAdapter, JWTAdapter } from '../../../../../src/infra/cryptography';
import { iHashAdapter, iTokenAdapter } from '../../../../../src/infra/cryptography/contracts';

export function makeHashAdapter(): iHashAdapter {
  return new BcryptAdapter(4);
}

export function makeTokenAdapter(): iTokenAdapter {
  return new JWTAdapter();
}
