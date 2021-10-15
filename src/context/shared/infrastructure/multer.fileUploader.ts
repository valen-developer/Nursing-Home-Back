import fs from 'fs';
import path from 'path';
import { File as FileForm } from 'formidable';

import { FileUploader } from '../domain/interfaces/fileUploader.interface';
import { HTTPException } from '../domain/httpException';

export class FormFileUploader implements FileUploader {
  public aviableExtensions: string[] = ['png', 'jpeg', 'jpg'];
  constructor() {}

  /**
   *
   *
   * @param file (file form)
   * @param fileName
   * @param destinationPath
   */
  public async upload(
    file: FileForm,
    fileName: string,
    destinationPath: string
  ): Promise<string> {
    if (!file)
      throw new HTTPException('FormFileUploader', 'not file found', 400);

    const fileExtension = this.extractExtension(file.name ?? '');

    if (!this.aviableExtensions.includes(fileExtension)) {
      fs.unlink(file.path, (err) => {
        console.log(err);
      });

      console.log(file.name);

      return '';
    }

    const newPath = path.join(destinationPath, `${fileName}.${fileExtension}`);

    this.aviableExtensions.forEach((ext) => {
      const namePath = path.join(destinationPath, `${fileName}.${ext}`);
      const exits = fs.existsSync(namePath);

      if (exits) {
        fs.unlink(namePath, (err) => {
          console.log(err);
        });
      }
    });

    fs.rename(file.path, newPath, (err) => {
      console.log(err);
    });

    return `${fileName}.${fileExtension}`;
  }

  private extractExtension(fileName: string): string {
    const parts = fileName.split('.');
    const ext = parts[parts.length - 1];

    return ext;
  }
}
