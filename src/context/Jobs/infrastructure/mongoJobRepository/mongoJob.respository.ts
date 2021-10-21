import { HTTPException } from '../../../shared/domain/httpException';
import { JobRepository } from '../../domain/interfaces/JobRepository.interface';
import { Job, JobObject } from '../../domain/job.model';
import { JobMongoModel } from './mongoJobModel';

export class MongoJobRepository implements JobRepository {
  public async create(job: Job): Promise<void> {
    const jobMongoModel = new JobMongoModel(job.toObject());

    try {
      await jobMongoModel.save();
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
  }

  public async get(uuid: string): Promise<Job> {
    try {
      const jobMongo: JobObject = await JobMongoModel.findOne({ uuid });

      return new Job(jobMongo);
    } catch (error) {
      throw new HTTPException(
        'mongo job repository: get',
        'job not found',
        404
      );
    }
  }

  public async getAll(): Promise<Job[]> {
    try {
      const jobObject: JobObject[] = await JobMongoModel.find();

      return jobObject.map((j) => new Job(j));
    } catch (error) {
      return [];
    }
  }

  public async delete(uuid: string): Promise<void> {
    await JobMongoModel.findOneAndDelete({ uuid });
  }

  public async update(job: Job): Promise<Job> {
    try {
      await JobMongoModel.findOneAndUpdate(
        { uuid: job.uuid.value },
        job.toObject()
      );
      return job;
    } catch (error) {
      console.log(error);
      throw new HTTPException(
        'mongo job repository: update',
        'job can´t be updated',
        400
      );
    }
  }
}
