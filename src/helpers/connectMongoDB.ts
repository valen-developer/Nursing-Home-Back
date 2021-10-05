import mongoose from 'mongoose';
import { enviroment } from '../app/config/enviroment';

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

export const mongooseConnection = mongoose.connection;

mongooseConnection.on('error', (error) => {
  console.log(error);
});

mongooseConnection.once('open', () => {
  console.log('Connect to DB');
});
