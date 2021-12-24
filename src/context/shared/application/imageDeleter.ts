import { enviroment } from "../../../app/config/enviroment";
import { asyncForEach } from "../../../helpers/asynForeach";
import { ImageObject } from "../domain/image.model";
import { ImageRepository } from "../domain/interfaces/image.repository";
import { FileDeleter } from "./fileDeleter";

export class ImageDeleter {
  constructor(
    private imageRepository: ImageRepository,
    private fileDeleter: FileDeleter
  ) {}

  async delete(
    uuid: string,
    folder = enviroment.publicFolder
  ): Promise<ImageObject | undefined> {
    const deletedImage = await this.imageRepository.delete(uuid);

    if (deletedImage) {
      this.fileDeleter.byNameMatch(folder, deletedImage.path);
    }

    return deletedImage;
  }

  async deleteByEntityUuid(
    entityUuid: string,
    folder = enviroment.publicFolder
  ): Promise<ImageObject[]> {
    const deletedImages: ImageObject[] =
      (await this.imageRepository.deleteAllByEntity(entityUuid)) ?? [];

    deletedImages.forEach((image) => {
      this.fileDeleter.byNameMatch(folder, image.path);
    });

    return deletedImages;
  }
}
