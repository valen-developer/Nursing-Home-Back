import mongoose from 'mongoose';
import { enviroment } from '../app/config/enviroment';

export const connectMongoDB = () => {
  mongoose.connect(
    enviroment.db.uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      authSource: 'admin',
      auth: {
        user: enviroment.db.user,
        password: enviroment.db.password,
      },
    },
    (err) => {
      console.log(err);
    }
  );

  const db = mongoose.connection;

  db.on('error', (error) => {
    console.log(error);
  });

  db.once('open', () => {
    console.log('Connect to DB');
  });
};
