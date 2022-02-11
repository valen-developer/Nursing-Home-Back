import { ImagePath } from "./valueObject/imagePath.valueObject";
import { UUID } from "./valueObject/uuid.valueObject";

export class Image {
  public readonly uuid: UUID;
  public readonly entityUuid: UUID;
  public readonly path: ImagePath;

  constructor(image: ImageObject) {
    this.uuid = new UUID(image.uuid);
    this.entityUuid = new UUID(image.entityUuid);
    this.path = new ImagePath(image.path);
  }

  toObject(): ImageObject {
    return {
      uuid: this.uuid.value,
      path: this.path.value,
      entityUuid: this.entityUuid.value,
    };
  }
}

export interface ImageObject {
  uuid: string;
  path: string;
  entityUuid: string;
}
