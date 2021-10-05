export interface Mailer {
  sendMail(
    from: string,
    to: string,
    subject: string,
    html: string
  ): Promise<boolean | void>;
}
