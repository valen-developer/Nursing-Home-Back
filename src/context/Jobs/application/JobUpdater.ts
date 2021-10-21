import { JobRepository } from '../domain/interfaces/JobRepository.interface';
import { Job } from '../domain/job.model';

export class JobUpdater {
  constructor(private jobRepository: JobRepository) {}

  public async update(job: Job): Promise<Job> {
    return await this.jobRepository.update(job);
  }
}
