import { ImagePath } from '../../shared/domain/valueObject/imagePath.valueObject';
import { UUID } from '../../shared/domain/valueObject/uuid.valueObject';
import { ActivityDescription } from './valueObject/ActivityDescription.valueObject';
import { ActivityName } from './valueObject/ActivityName.valueObject';

export class Activity {
  public readonly uuid: UUID;
  public readonly name: ActivityName;
  public readonly description: ActivityDescription;
  private _imagePaths: ImagePath[] = [];

  constructor(activity: ActivityObject) {
    this.uuid = new UUID(activity.uuid);
    this.name = new ActivityName(activity.name);
    this.description = new ActivityDescription(activity.description);
    this._imagePaths = activity.imagePaths?.map((i) => new ImagePath(i)) ?? [];
  }

  get imagePaths(): string[] {
    return this._imagePaths.map((imagePath) => imagePath.value);
  }

  public toObject(): ActivityObject {
    return {
      uuid: this.uuid.value,
      name: this.name.value,
      description: this.description.value,
      imagePaths: this.imagePaths,
    };
  }

  public setImages(imagePaths: string[]) {
    this._imagePaths = imagePaths.map((imagePath) => new ImagePath(imagePath));
  }
}

export interface ActivityObject {
  uuid: string;
  name: string;
  description: string;
  imagePaths: string[];
}
