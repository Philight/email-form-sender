import nodemailer from 'nodemailer';
import { User } from '@prisma/client';
import pug from 'pug';
import { convert } from 'html-to-text';
import customConfig from '../config/default';

const smtp = customConfig.smtp;

export default class Email {
//  firstName: string;

  from: string;
  to: string;
  cc?: string | string[];
  subject: string;
  body: string;
  attachments?: string[];

  constructor(email: any) {
console.log('Email class constructor');
console.log(email);
    this.from = email.from;
    this.to = email.to;
    this.cc = email.cc;
    this.subject = email.subject;
    this.body = email.body;
    this.attachments = email.attachments;
  }

  private newTransport() {
    // if (process.env.NODE_ENV === 'production') {
    //   console.log('Hello')
    // }

    return nodemailer.createTransport({
      ...smtp,
      auth: {
        user: smtp.user,
        pass: smtp.pass,
      },
    });
  }

  private async send(template: string, subject: string) {
console.log('Email class send');
    // Generate HTML template based on the template string
    const html = pug.renderFile(`${__dirname}/../views/${template}.pug`, {
//      firstName: this.firstName,
      subject,
      url: this.url,
    });

    // Create mailOptions
    const mailOptions = {
      from: this.from,
      to: this.to,
      cc: this.cc,
      subject,
      text: convert(html),
      html,
    };

    // Send email
    const info = await this.newTransport().sendMail(mailOptions);
    console.log(nodemailer.getTestMessageUrl(info));
  }

  async sendVerificationCode() {
    await this.send('verificationCode', 'Your account verification code');
  }

  async sendPasswordResetToken() {
    await this.send(
      'resetPassword',
      'Your password reset token (valid for only 10 minutes)'
    );
  }



  async sendEmail(subject?: string) {
    await this.send(
      'fullEmail', 
      subject ?? 'Default: Email subject'
    );
  }
}
