import path from 'path';
import { loadEnv } from '../../helpers/loadENV';
loadEnv();

export const enviroment = {
  db: {
    uri: process.env.DATABASE_URI || `mongodb://localhost:27017/nursinghome`,
    db: process.env.DB || 'newspaper',
    host: process.env.DATABASE_HOST || 'host',
    user: process.env.DATABASE_USER || 'admin',
    password: process.env.DATABASE_PASSWORD || 'admin',
  },
  mailer: {
    appMail: process.env.APP_MAIL || 'email@email.com',
    mail: process.env.APP_MAIL || 'email@email.com',
    password: process.env.MAIL_PASSWORD || 'pass',
    host: process.env.MAIL_HOST || 'gmail',
    port: process.env.MAIL_PORT || 553,
  },
  token: {
    seed: process.env.TOKENSEED || 'Una seed',
    expireIn: process.env.TOKENEXPIRE || '30d',
  },
  port: process.env.PORT || '',
  publicFolder: path.join(__dirname, '../../..', 'public'),
  fileFolderPath:
    process.env.FILES_FOLDER_PATH || path.join(__dirname, '../../..', 'files'),
};
