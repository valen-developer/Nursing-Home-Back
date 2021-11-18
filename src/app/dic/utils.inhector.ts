import { IOC } from 'dic-ioc';
import { FileDeleter } from '../../context/shared/application/fileDeleter';
import { ImageDeleter } from '../../context/shared/application/imageDeleter';
import { Bcrypt } from '../../context/shared/infrastructure/bcrypt.crypt';
import { JWT } from '../../context/shared/infrastructure/jsonwebtoken.jwt';
import { FormFileUploader } from '../../context/shared/infrastructure/multer.fileUploader';

import {
  NodeMailer,
  TransporterMailer,
} from '../../context/shared/infrastructure/nodemailer.mailer';
import { UuidGenerator } from '../../context/shared/infrastructure/uuidGenerator';

import { enviroment } from '../config/enviroment';
import { Repositories } from './repositories.injector';

export const enum UtilDependencies {
  JWT = 'JWT',
  Crypt = 'Crypt',
  Mailer = 'Mailer',
  UuidGenerator = 'UuidGenerator',
  FileUploader = 'FileUploader',
  FileDeleter = 'FileDeleter',
  ImageDeleter = 'ImageDeleter',
}

export const injectUtils = (container: IOC): IOC => {
  container.setService(UtilDependencies.JWT, () => new JWT());
  container.setService(UtilDependencies.Crypt, () => new Bcrypt());
  container.setService(
    UtilDependencies.FileUploader,
    () => new FormFileUploader()
  );

  const mailerTransport: TransporterMailer = {
    auth: {
      pass: enviroment.mailer.password,
      user: enviroment.mailer.mail,
    },
    port: Number(enviroment.mailer.port),
    service: 'gmail',
  };
  container.setService(
    UtilDependencies.Mailer,
    () => new NodeMailer(mailerTransport)
  );

  container.setService(
    UtilDependencies.UuidGenerator,
    () => new UuidGenerator()
  );

  container.setService(UtilDependencies.FileDeleter, () => new FileDeleter());

  container.setService(
    UtilDependencies.ImageDeleter,
    (c) =>
      new ImageDeleter(c.get(Repositories.ImageRepository), new FileDeleter())
  );

  return container;
};
