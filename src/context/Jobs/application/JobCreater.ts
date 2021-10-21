import { JobRepository } from '../domain/interfaces/JobRepository.interface';
import { Job } from '../domain/job.model';

export class JobCreater {
  constructor(private jobRepository: JobRepository) {}

  public async create(job: Job): Promise<void> {
    await this.jobRepository.create(job);
  }
}
