import { Image, ImageObject } from "../image.model";

export abstract class ImageRepository {
  abstract create(image: Image): Promise<Image>;
  abstract getByEntityUuid(entityUuid: string): Promise<Image[]>;
  abstract delete(uuid: string): Promise<ImageObject | undefined>;
  abstract deleteByPath(path: string): Promise<ImageObject | undefined>;
  abstract deleteAllByEntity(entityUuid: string): Promise<ImageObject[]>;
}
