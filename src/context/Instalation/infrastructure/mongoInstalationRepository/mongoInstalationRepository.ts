import { HTTPException } from '../../../shared/domain/httpException';
import { Instalation, InstalationObject } from '../../domain/instalation.model';
import { InstalationRepository } from '../../domain/interfaces/instalation.respository';
import { InstalationMongoModel } from './mongoInstalationModel';

export class MongoInstalationRepository implements InstalationRepository {
  public async create(instalation: Instalation): Promise<void> {
    const instalationMongoModel = new InstalationMongoModel(
      instalation.toObject()
    );

    try {
      await instalationMongoModel.save();
    } catch (error: any) {
      const keyPattern = error.keyPattern;
      if (!keyPattern) {
        throw new HTTPException(
          'mongo user repository:save ',
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

  public async update(instalation: Instalation): Promise<Instalation> {
    try {
      await InstalationMongoModel.findOneAndUpdate(
        { uuid: instalation.uuid.value },
        instalation.toObject()
      );
      return instalation;
    } catch (error) {
      console.log(error);
      throw new HTTPException(
        'mongo user repository: update',
        'user can´t be updated',
        400
      );
    }
  }

  public async delete(uuid: string): Promise<void> {
    await InstalationMongoModel.findOneAndDelete({ uuid });
  }

  public async get(uuid: string): Promise<Instalation> {
    try {
      const instalationMongo: InstalationObject =
        await InstalationMongoModel.findOne({ uuid });

      return new Instalation(instalationMongo);
    } catch (error) {
      throw new HTTPException(
        'mongo user repository: get',
        'user not found',
        404
      );
    }
  }

  public async getAll(): Promise<Instalation[]> {
    try {
      const instalationObjets: InstalationObject[] =
        await InstalationMongoModel.find();

      return instalationObjets.map((i) => new Instalation(i));
    } catch (error) {
      return [];
    }
  }
}
