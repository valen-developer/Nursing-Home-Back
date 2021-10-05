import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

import { Mailer } from '../domain/interfaces/mailer.interface';

export class NodeMailer implements Mailer {
  private transporter: Mail;

  constructor(transporter: TransporterMailer) {
    this.transporter = nodemailer.createTransport(transporter);
  }

  public async sendMail(
    from: string,
    to: string,
    subject: string,
    html: string
  ): Promise<boolean | void> {
    try {
      const resp = await this.transporter.sendMail({
        from: from,
        to: to,
        subject,
        html,
      });
    } catch (error) {
      console.log(error);
      throw new Error('server error');
    }
  }
}

export interface TransporterMailer {
  host?: string;
  port?: number;
  secure?: boolean;
  service?: string;
  auth: {
    user: string;
    pass: string;
  };
}
