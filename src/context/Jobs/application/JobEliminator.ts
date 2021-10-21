import { JobRepository } from '../domain/interfaces/JobRepository.interface';

export class JobEliminator {
  constructor(private jobRepository: JobRepository) {}

  public async delete(uuid: string): Promise<void> {
    await this.jobRepository.delete(uuid);
  }
}
