import { iMailProvider } from './contracts/iMailProvider';
import SendGridProvider from '@sendgrid/mail';

export class SendGridMail implements iMailProvider {
  protected readonly API_KEY = process.env.MAIL_API_KEY as string;
  protected readonly Provider: SendGridProvider.MailService;

  constructor() {
    this.Provider = SendGridProvider;
    this.Provider.setApiKey(this.API_KEY);
  }

  async send(body: iMailProvider.ContentEmail): Promise<boolean> {
    const result = await this.Provider.send({
      ...body,
      from: process.env.EMAIL_INTERNAL as string,
    } as any);

    return [200, 201, 202].includes(result[0].statusCode);
  }
}
