import { IOC } from 'dic-ioc';
import { JobCreater } from '../../context/Jobs/application/JobCreater';
import { JobEliminator } from '../../context/Jobs/application/JobEliminator';
import { JobFinder } from '../../context/Jobs/application/JobFinder';
import { JobUpdater } from '../../context/Jobs/application/JobUpdater';
import { ImageDeleter } from '../../context/shared/application/imageDeleter';
import { ImageRepository } from '../../context/shared/domain/interfaces/image.repository';
import { Repositories } from './repositories.injector';
import { UtilDependencies } from './utils.inhector';

export const enum JobUsesCases {
  JobFinder = 'JobFinder',
  JobCreator = 'JobCreator',
  JobEliminator = 'JobEliminator',
  JobUpdate = 'JobUpdater',
}

export const injectJobUsesCases = (c: IOC): IOC => {
  const jobRepository = c.get(Repositories.JobRepository);
  const imageRepository: ImageRepository = c.get(Repositories.ImageRepository);
  const imageDeleter: ImageDeleter = c.get(UtilDependencies.ImageDeleter);

  c.setService(
    JobUsesCases.JobCreator,
    (c) =>
      new JobCreater(
        jobRepository,
        imageRepository,
        c.get(UtilDependencies.UuidGenerator)
      )
  );

  c.setService(
    JobUsesCases.JobEliminator,
    () => new JobEliminator(jobRepository, imageDeleter)
  );

  c.setService(
    JobUsesCases.JobFinder,
    () => new JobFinder(jobRepository, imageRepository)
  );

  c.setService(
    JobUsesCases.JobUpdate,
    (c) =>
      new JobUpdater(
        jobRepository,
        c.get(Repositories.ImageRepository),
        c.get(UtilDependencies.UuidGenerator)
      )
  );

  return c;
};
