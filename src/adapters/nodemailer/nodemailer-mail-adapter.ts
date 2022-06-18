import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "6c861df4a09458",
    pass: "b7154d7569beb3",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe feedget <teste@mail.com>",
      to: "Daniel Major <danielmajor.mail.com.br>",
      subject: subject,
      html: body,
    });
  }
}


