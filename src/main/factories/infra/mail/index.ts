import { iMailProvider } from '../../../../../src/infra/mail/contracts/iMailProvider';
import { SendGridMail } from '../../../../../src/infra/mail/sendgrid.mail';

export function makeMailProvider(): iMailProvider {
  return new SendGridMail();
}
