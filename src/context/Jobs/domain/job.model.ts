import { Image, ImageObject } from "../../shared/domain/image.model";
import { ImagePath } from "../../shared/domain/valueObject/imagePath.valueObject";
import { UUID } from "../../shared/domain/valueObject/uuid.valueObject";
import { JobDescription } from "./valueObject/Jobdescription.valueObject";
import { JobName } from "./valueObject/JobName.valueObject";

export class Job {
  public readonly uuid: UUID;
  public readonly name: JobName;
  public readonly description: JobDescription;
  private _images: Image[] = [];
  private _imagePaths: ImagePath[] = [];

  constructor(job: JobObject) {
    this.uuid = new UUID(job.uuid);
    this.name = new JobName(job.name);
    this.description = new JobDescription(job.description);
    this._imagePaths = job.imagePaths.map(
      (imagePath) => new ImagePath(imagePath)
    );
  }

  get imagePaths(): string[] {
    return this._imagePaths.map((imagePath) => imagePath.value);
  }

  get images(): Image[] {
    return this._images;
  }

  public toObject(): JobObject {
    return {
      uuid: this.uuid.value,
      name: this.name.value,
      description: this.description.value,
      imagePaths: this.imagePaths,
      images: this.images.map((image) => image.toObject()),
    };
  }

  public setImages(images: Image[]) {
    this._imagePaths = images.map((image) => image.path);
    this._images = images;
  }
}

export interface JobObject {
  uuid: string;
  name: string;
  description: string;
  imagePaths: string[];
  images?: ImageObject[];
}
