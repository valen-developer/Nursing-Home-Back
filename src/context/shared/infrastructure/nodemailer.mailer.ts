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
  ): Promise<boolean> {
    return await this.transporter
      .sendMail({
        from: from,
        to: to,
        subject,
        html,
      })
      .then(() => true)
      .catch((error) => {
        console.log('🚀 -> NodeMailer -> error', error);

        return false;
      });
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
