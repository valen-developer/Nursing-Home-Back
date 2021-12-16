import { Image } from "../domain/image.model";
import { ImageRepository } from "../domain/interfaces/image.repository";

import fs from "fs";
import path from "path";
import { FileUploader } from "../domain/interfaces/fileUploader.interface";
import { enviroment } from "../../../app/config/enviroment";
import { HTTPException } from "../domain/httpException";

export class ImageDuplicator {
  constructor(
    private imageRepository: ImageRepository,
    private fileUploader: FileUploader
  ) {}

  public async duplicateImage(
    image: Image,
    entityUuid: string
  ): Promise<Image> {
    const imagePath = path.join(enviroment.publicFolder, image.path.value);

    const file = fs.readFileSync(imagePath, { encoding: "base64" });

    // dataUrl to File
    const fileBuffer = Buffer.from(file, "base64");
    const fileName = `${entityUuid}`;
    const fileExtension = this.fileUploader.extractExtension(image.path.value);
    const filePath = path.join(
      enviroment.publicFolder,
      `${fileName}.${fileExtension}`
    );
    const fileStream = fs.createWriteStream(filePath);
    fileStream.write(fileBuffer);
    fileStream.close();

    return this.imageRepository.create(
      new Image({
        ...image.toObject(),
        path: `${fileName}.${fileExtension}`,
      })
    );
  }
}
