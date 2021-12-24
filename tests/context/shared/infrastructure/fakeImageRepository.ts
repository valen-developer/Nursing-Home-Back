import {
  Image,
  ImageObject,
} from "../../../../src/context/shared/domain/image.model";
import { ImageRepository } from "../../../../src/context/shared/domain/interfaces/image.repository";

export class FakeImageRepository implements ImageRepository {
  private _images: Image[] = [];

  create(image: Image): Promise<Image> {
    return new Promise((resolve, reject) => {
      this._images.push(image);
      resolve(image);
    });
  }

  getByEntityUuid(entityUuid: string): Promise<Image[]> {
    return new Promise((resolve, reject) => {
      resolve(this._images.filter((i) => i.entityUuid.value === entityUuid));
    });
  }

  delete(uuid: string): Promise<ImageObject | undefined> {
    const image = this._images.find((i) => i.uuid.value === uuid);
    this._images = this._images.filter((i) => i.uuid.value !== uuid);

    return new Promise((resolve, reject) => {
      resolve(image?.toObject());
    });
  }

  deleteAllByEntity(entityUuid: string): Promise<ImageObject[]> {
    const images = this._images.filter(
      (i) => i.entityUuid.value === entityUuid
    );
    this._images = this._images.filter(
      (i) => i.entityUuid.value !== entityUuid
    );

    return new Promise((resolve, reject) => {
      resolve(images.map((i) => i.toObject()));
    });
  }
}
