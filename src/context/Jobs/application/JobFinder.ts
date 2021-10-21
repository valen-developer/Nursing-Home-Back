import { JobRepository } from '../domain/interfaces/JobRepository.interface';
import { Job } from '../domain/job.model';

export class JobFinder {
  constructor(private jobRepository: JobRepository) {}

  public async get(uuid: string): Promise<Job> {
    return await this.jobRepository.get(uuid);
  }

  public async getAll(): Promise<Job[]> {
    return await this.jobRepository.getAll();
  }
}
