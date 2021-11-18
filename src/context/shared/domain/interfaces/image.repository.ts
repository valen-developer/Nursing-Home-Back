import { Image } from '../image.model';

export abstract class ImageRepository {
  abstract create(image: Image): Promise<Image>;
  abstract delete(uuid: string): Promise<void>;
  abstract deleteAllByEntity(entityUuid: string): Promise<void>;
}
