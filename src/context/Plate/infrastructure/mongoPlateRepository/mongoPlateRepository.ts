import { HTTPException } from '../../../shared/domain/httpException';
import { PlateRepository } from '../../domain/interfaces/PlateRepository.interface';
import { Plate, PlateObject } from '../../domain/plate.model';
import { PlateMongoModel } from './mongoPlateModel';

export class MongoPlateRepository implements PlateRepository {
  async getPlates(): Promise<Plate[]> {
    try {
      const platesObject: PlateObject[] = await PlateMongoModel.find();
      return platesObject.map((plate) => new Plate(plate));
    } catch (error) {
      return [];
    }
  }

  async getPlatesByDate(date: Date): Promise<Plate[]> {
    try {
      const plates: PlateObject[] = await PlateMongoModel.findOne({
        date: date,
      });

      return plates.map((plate) => new Plate(plate));
    } catch (error) {
      return [];
    }
  }

  async getPlate(uuid: string): Promise<Plate> {
    try {
      const plate: PlateObject = await PlateMongoModel.findOne({ uuid });
      return new Plate(plate);
    } catch (error) {
      throw new HTTPException(
        'mongo plate repository: get',
        'Plate not found',
        404
      );
    }
  }

  async createPlate(plate: Plate): Promise<Plate> {
    const plateMongoModel = new PlateMongoModel(plate.toObject());

    try {
      await plateMongoModel.save();
    } catch (error: any) {
      const keyPattern = error.keyPattern;
      if (!keyPattern) {
        throw new HTTPException(
          'mongo job repository:save ',
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

    return plate;
  }

  async updatePlate(plate: Plate): Promise<Plate> {
    try {
      await PlateMongoModel.findOneAndUpdate(
        { uuid: plate.uuid.value },
        plate.toObject()
      );
      return plate;
    } catch (error) {
      throw new HTTPException(
        'mongo plate repository: update',
        'plate can´t be updated',
        400
      );
    }
  }

  async deletePlate(uuid: string): Promise<void> {
    await PlateMongoModel.deleteOne({ uuid });
  }
}
