import { Job } from '../job.model';

export abstract class JobRepository {
  public abstract create(job: Job): Promise<void>;
  public abstract get(uuid: string): Promise<Job>;
  public abstract getAll(): Promise<Job[]>;
  public abstract delete(uuid: string): Promise<void>;
  public abstract update(job: Job): Promise<Job>;
}
