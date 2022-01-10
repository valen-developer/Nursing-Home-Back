import { IOC } from "dic-ioc";
import { FileDeleter } from "../../context/shared/application/fileDeleter";
import { ImageDeleter } from "../../context/shared/application/imageDeleter";
import { ImageDuplicator } from "../../context/shared/application/imageDuplicator";
import { Bcrypt } from "../../context/shared/infrastructure/bcrypt.crypt";
import { JWT } from "../../context/shared/infrastructure/jsonwebtoken.jwt";
import { MongoQueryBuilder } from "../../context/shared/infrastructure/MongoQueryBuilder";
import { FormFileUploader } from "../../context/shared/infrastructure/multer.fileUploader";

import {
  NodeMailer,
  TransporterMailer,
} from "../../context/shared/infrastructure/nodemailer.mailer";
import { SharpImageResizer } from "../../context/shared/infrastructure/SharpImageResizer";
import { UuidGenerator } from "../../context/shared/infrastructure/uuidGenerator";

import { enviroment } from "../config/enviroment";
import { Repositories } from "./repositories.injector";

export const enum UtilDependencies {
  JWT = "JWT",
  Crypt = "Crypt",
  Mailer = "Mailer",
  UuidGenerator = "UuidGenerator",
  FileUploader = "FileUploader",
  FileDeleter = "FileDeleter",
  ImageDeleter = "ImageDeleter",
  ImageResizer = "ImageResizer",
  ImageDuplicator = "ImageDuplicator",
  QueryBuilder = "QueryBuilder",
}

export const injectUtils = (container: IOC): IOC => {
  container.setService(UtilDependencies.JWT, () => new JWT());
  container.setService(UtilDependencies.Crypt, () => new Bcrypt());
  container.setService(
    UtilDependencies.UuidGenerator,
    () => new UuidGenerator()
  );
  container.setService(
    UtilDependencies.ImageResizer,
    () => new SharpImageResizer()
  );

  const mailerTransport: TransporterMailer = {
    auth: {
      pass: enviroment.mailer.password,
      user: enviroment.mailer.mail,
    },
    port: Number(enviroment.mailer.port),
    service: "gmail",
  };
  container.setService(
    UtilDependencies.Mailer,
    () => new NodeMailer(mailerTransport)
  );
  container.setService(UtilDependencies.FileDeleter, () => new FileDeleter());

  container.setService(
    UtilDependencies.ImageDeleter,
    (c) =>
      new ImageDeleter(c.get(Repositories.ImageRepository), new FileDeleter())
  );

  container.setService(
    UtilDependencies.FileUploader,
    (c) => new FormFileUploader(c.get(UtilDependencies.UuidGenerator))
  );

  container.setService(
    UtilDependencies.ImageDuplicator,
    (c) =>
      new ImageDuplicator(
        c.get(Repositories.ImageRepository),
        c.get(UtilDependencies.FileUploader)
      )
  );

  container.setService(
    UtilDependencies.QueryBuilder,
    () => new MongoQueryBuilder()
  );

  return container;
};
