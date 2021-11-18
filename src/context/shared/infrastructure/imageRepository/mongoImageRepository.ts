import { HTTPException } from '../../domain/httpException';
import { Image, ImageObject } from '../../domain/image.model';
import { ImageRepository } from '../../domain/interfaces/image.repository';
import { ImageMongoModel } from './imageMongoModel';

export class MongoImageRepository implements ImageRepository {
  async getByEntityUuid(entityUuid: string): Promise<Image[]> {
    const images: ImageObject[] = await ImageMongoModel.find({ entityUuid });
    if (!images) return [];

    return images.map((image) => new Image(image));
  }

  async create(image: Image): Promise<Image> {
    console.log('🚀 -> MongoImageRepository -> create -> image', image);
    const imageMongoModel = new ImageMongoModel(image.toObject());

    try {
      await imageMongoModel.save();
      return image;
    } catch (error: any) {
      const keyPattern = error.keyPattern;
      if (!keyPattern) {
        throw new HTTPException(
          'mongo image repository:save ',
          'server error',
          500
        );
      }

      const keys = Object.keys(keyPattern);
      throw new HTTPException(
        'mongo user repository:save ',
        `${keys[0]} already exist`,
        400
      );
    }
  }

  async delete(uuid: string): Promise<void> {
    await ImageMongoModel.findOneAndDelete({ uuid });
  }

  async deleteAllByEntity(entityUuid: string): Promise<void> {
    await ImageMongoModel.findOneAndDelete({ entityUuid });
  }
}
