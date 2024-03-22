import nodemailer, { Transporter } from 'nodemailer';
import { config } from 'dotenv';
import { MailOptions } from 'nodemailer/lib/sendmail-transport';
import { google } from 'googleapis';

config();

const oauth2Client = new google.auth.OAuth2(
  process.env.MAIL_CLIENT_ID,
  process.env.MAIL_CLIENT_SECRET,
  process.env.REDIRECT_URI,
);
oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

export const sendMail = async (mailOptions: MailOptions) => {
  try {
    const { credentials } = await oauth2Client.refreshAccessToken();
    const accessToken = credentials.access_token;

    const transporter: Transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USER,
        clientId: process.env.MAIL_CLIENT_ID,
        clientSecret: process.env.MAIL_CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
      },
    });
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error(error);
  }
};
