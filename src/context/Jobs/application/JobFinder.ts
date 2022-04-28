import { asyncForEach } from "../../../helpers/asynForeach";
import { ImageRepository } from "../../shared/domain/interfaces/image.repository";
import { JobRepository } from "../domain/interfaces/JobRepository.interface";
import { Job } from "../domain/job.model";

export class JobFinder {
  constructor(
    private jobRepository: JobRepository,
    private imageRepository: ImageRepository
  ) {}

  public async get(uuid: string): Promise<Job> {
    const job = await this.jobRepository.get(uuid);
    const images = await this.imageRepository.getByEntityUuid(job.uuid.value);
    job.setImages(images);

    return job;
  }

  public async getAll(): Promise<Job[]> {
    const jobs = await this.jobRepository.getAll();

    await asyncForEach<Job>(jobs, async (a) => {
      const images = await this.imageRepository.getByEntityUuid(a.uuid.value);
      a.setImages(images);
    });

    return jobs;
  }
}
