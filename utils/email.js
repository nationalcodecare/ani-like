const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url, password = null) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Alex Belz <${process.env.EMAIL_FROM}>`;

    this.password = password;
  }
  // Create Transport
  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Sendgrid
      return nodemailer.createTransport({
        service: 'SendinBlue',
        auth: {
          user: process.env.SENDINBLUE_USERNAME,
          pass: process.env.SENDINBLUE_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  //  Send the actual email
  async send(template, subject) {
    //  1) Render html
    const html = pug.renderFile(`${__dirname}/../views/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      password: this.password,
      subject,
    });

    //  2) Defina email options

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
    };

    //  3) create a transpoet & send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendPassword() {
    await this.send('password', 'Check out yout new password!');
  }

  async sendPasswordReset() {
    await this.send('email', 'Your password reset token.');
  }
};
