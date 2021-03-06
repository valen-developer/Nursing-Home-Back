import { HTTPException } from "../../domain/httpException";
import { Image, ImageObject } from "../../domain/image.model";
import { ImageRepository } from "../../domain/interfaces/image.repository";
import { ImageMongoModel } from "./imageMongoModel";

export class MongoImageRepository implements ImageRepository {
  async getByEntityUuid(entityUuid: string): Promise<Image[]> {
    const images: ImageObject[] = await ImageMongoModel.find({ entityUuid });
    if (!images) return [];

    return images.map((image) => new Image(image));
  }

  async findRandomImage(): Promise<Image> {
    const image: ImageObject = await ImageMongoModel.aggregate([
      { $sample: { size: 1 } },
    ]).then((images) => images[0]);

    if (!image)
      throw new HTTPException(
        "mongo image repository:findRandomImage",
        "no image found",
        404
      );

    return new Image(image);
  }

  async create(image: Image): Promise<Image> {
    const imageMongoModel = new ImageMongoModel(image.toObject());

    try {
      await imageMongoModel.save();
      return image;
    } catch (error: any) {
      const keyPattern = error.keyPattern;
      if (!keyPattern) {
        throw new HTTPException(
          "mongo image repository:save ",
          "server error",
          500
        );
      }

      const keys = Object.keys(keyPattern);
      throw new HTTPException(
        "mongo user repository:save ",
        `${keys[0]} already exist`,
        400
      );
    }
  }

  async delete(uuid: string): Promise<ImageObject> {
    const image: ImageObject = await ImageMongoModel.findOneAndDelete({ uuid });

    return image;
  }

  async deleteAllByEntity(entityUuid: string): Promise<ImageObject[]> {
    const images: ImageObject[] = await ImageMongoModel.find({ entityUuid });
    await ImageMongoModel.deleteMany({ entityUuid });

    return images;
  }

  async deleteByPath(path: string): Promise<ImageObject | undefined> {
    const image = await ImageMongoModel.findOneAndDelete({ path });

    return image;
  }
}
