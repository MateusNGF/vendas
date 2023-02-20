export abstract class iMailProvider {
  abstract send(body: iMailProvider.ContentEmail): Promise<boolean>;
}

export namespace iMailProvider {
  export type complementAboutEmail = { name?: string; email: string };
  export type EmailData = string | complementAboutEmail;
  export type ContentEmail = {
    to?: EmailData | EmailData[];
    // from?: EmailData,
    subject?: string;
    text?: string;
    html?: string;
    templateId?: string;
  };
}
