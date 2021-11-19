import { IOC } from 'dic-ioc';
import { ActivityCreator } from '../../context/Activity/application/ActivityCreator';
import { ActivityEliminator } from '../../context/Activity/application/ActivityEliminator';
import { ActivityFinder } from '../../context/Activity/application/ActivityFinder';
import { ActivityUpdater } from '../../context/Activity/application/ActivityUpdater';
import { ActivityRepository } from '../../context/Activity/domain/interfaces/ActivityRepository.interface';
import { ImageDeleter } from '../../context/shared/application/imageDeleter';
import { ImageRepository } from '../../context/shared/domain/interfaces/image.repository';
import { Repositories } from './repositories.injector';
import { UtilDependencies } from './utils.inhector';

export enum ActivityUsesCases {
  ActivityCreator = 'ActivityCreator',
  ActivityUpdater = 'ActivityUpdater',
  ActivityDeleter = 'ActivityDeleter',
  ActivityFinder = 'ActivityFinder',
}

export const injectActivityUsesCases = (container: IOC): IOC => {
  const activityRepository: ActivityRepository = container.get(
    Repositories.ActivityRepository
  );

  const imageRepository: ImageRepository = container.get(
    Repositories.ImageRepository
  );

  const imageDeleter: ImageDeleter = container.get(
    UtilDependencies.ImageDeleter
  );

  container.setService(
    ActivityUsesCases.ActivityCreator,
    (c) =>
      new ActivityCreator(
        activityRepository,
        imageRepository,
        c.get(UtilDependencies.UuidGenerator)
      )
  );
  container.setService(
    ActivityUsesCases.ActivityUpdater,
    (c) =>
      new ActivityUpdater(
        activityRepository,
        c.get(Repositories.ImageRepository),
        c.get(UtilDependencies.UuidGenerator)
      )
  );
  container.setService(
    ActivityUsesCases.ActivityDeleter,
    () => new ActivityEliminator(activityRepository, imageDeleter)
  );
  container.setService(
    ActivityUsesCases.ActivityFinder,
    () => new ActivityFinder(activityRepository, imageRepository)
  );

  return container;
};
