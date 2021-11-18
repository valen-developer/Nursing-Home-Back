import { enviroment } from '../../../app/config/enviroment';
import { asyncForEach } from '../../../helpers/asynForeach';
import { ImageObject } from '../domain/image.model';
import { ImageRepository } from '../domain/interfaces/image.repository';
import { FileDeleter } from './fileDeleter';

export class ImageDeleter {
  constructor(
    private imageRepository: ImageRepository,
    private fileDeleter: FileDeleter
  ) {}

  async delete(uuid: string): Promise<ImageObject> {
    const deletedImage = await this.imageRepository.delete(uuid);

    if (deletedImage) {
      this.fileDeleter.byNameMatch(enviroment.publicFolder, deletedImage.path);
    }

    return deletedImage;
  }

  async deleteByEntityUuid(entityUuid: string): Promise<ImageObject[]> {
    const deletedImages: ImageObject[] =
      (await this.imageRepository.deleteAllByEntity(entityUuid)) ?? [];

    deletedImages.forEach((image) => {
      this.fileDeleter.byNameMatch(enviroment.publicFolder, image.path);
    });

    return deletedImages;
  }
}
