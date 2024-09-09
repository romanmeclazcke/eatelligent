import { Injectable } from '@nestjs/common';
import { transporter } from './config/nodemailer.connection';


@Injectable()
export class sendEmailServices {
  async sendEmail(
    subject: string,
    templete: string,
    userEmail: string,
    text: string,
  ) {
    const mailData = {
      from: process.env.EMAILNOTIFY,
      to: userEmail,
      subject: subject,
      text: text,
      html: templete,
    };

    transporter.sendMail(mailData, (error, info) => {
      if (!error) {
        return console.log('Email enviado con éxito:', info.response);
      }
      throw new Error('Error al enviar email: ' + error.name);
    });
  }
}
