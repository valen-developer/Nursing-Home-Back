import formidable, { File as FileForm } from "formidable";
import fs from "fs";
import path from "path";
import { asyncForEach } from "../../../helpers/asynForeach";
import { FileUploader } from "../domain/interfaces/fileUploader.interface";
import { UuidGenerator } from "./uuidGenerator";

export class FormFileUploader implements FileUploader {
  public aviableExtensions: string[] = ["png", "jpeg", "jpg"];
  constructor(private uuidGenerator: UuidGenerator) {}

  /**
   *
   *
   * @param file (file form)
   * @param fileName
   * @param destinationPath
   */
  public async upload(
    file: any,
    fileName: string,
    destinationPath: string
  ): Promise<string | null> {
    if (!file) return null;

    const originalName = file.filepath;

    const fileExtension = this.extractExtension(file.originalFilename ?? "");

    if (!this.aviableExtensions.includes(fileExtension)) {
      fs.unlink(originalName, (err) => {
        if (!err) return;
        console.log(err);
      });

      return "";
    }

    const newPath = path.join(destinationPath, `${fileName}.${fileExtension}`);

    this.aviableExtensions.forEach((ext) => {
      const namePath = path.join(destinationPath, `${fileName}.${ext}`);
      const exits = fs.existsSync(namePath);

      if (exits) {
        fs.unlink(namePath, (err) => {
          if (!err) return;
          throw new Error("Error on save file");
        });
      }
    });

    fs.rename(originalName, newPath, (err) => {
      if (!err) return newPath;
      throw new Error("Error on save file");
    });

    return `${fileName}.${fileExtension}`;
  }

  public async uploadAll(
    files: FileForm[],
    fileName: string,
    destinationPath: string
  ): Promise<string[]> {
    let imagePaths: string[] = [];
    await asyncForEach<formidable.File>(files, async (file, i) => {
      const ipath: string | null = await this.upload(
        file,
        `${fileName}-${this.uuidGenerator.generate()}`,
        destinationPath
      );

      if (ipath) imagePaths.push(ipath);
    });

    return imagePaths;
  }

  public extractExtension(fileName: string): string {
    const parts = fileName.split(".");
    const ext = parts[parts.length - 1];

    return ext;
  }
}
