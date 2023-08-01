import dotenv from 'dotenv';
import path from 'path';
import nodemailer from 'nodemailer';

dotenv.config({
  path: path.resolve(
    process.env.NODE_ENV === 'production'
      ? '.prod.env'
      : process.env.NODE_ENV === 'test'
      ? '.test.env'
      : '.dev.env',
  ),
});

const smtpTransport = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// 랜덤 스트링 생성
export function generateRandomString(length) {
  const charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomString += charset[randomIndex];
  }
  return randomString;
}

export default smtpTransport;
