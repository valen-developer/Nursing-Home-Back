import { IOC } from 'dic-ioc';
import { JobCreater } from '../../context/Jobs/application/JobCreater';
import { JobEliminator } from '../../context/Jobs/application/JobEliminator';
import { JobFinder } from '../../context/Jobs/application/JobFinder';
import { JobUpdater } from '../../context/Jobs/application/JobUpdater';
import { Repositories } from './repositories.injector';

export const enum JobUsesCases {
  JobFinder = 'JobFinder',
  JobCreator = 'JobCreator',
  JobEliminator = 'JobEliminator',
  JobUpdate = 'JobUpdater',
}

export const injectJobUsesCases = (c: IOC): IOC => {
  const jobRepository = c.get(Repositories.JobRepository);

  c.setService(JobUsesCases.JobCreator, () => new JobCreater(jobRepository));

  c.setService(
    JobUsesCases.JobEliminator,
    () => new JobEliminator(jobRepository)
  );

  c.setService(JobUsesCases.JobFinder, () => new JobFinder(jobRepository));

  c.setService(JobUsesCases.JobUpdate, () => new JobUpdater(jobRepository));

  return c;
};
