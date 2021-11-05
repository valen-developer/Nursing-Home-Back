import { IOC } from 'dic-ioc';
import { ActivityCreator } from '../../context/Activity/application/ActivityCreator';
import { ActivityEliminator } from '../../context/Activity/application/ActivityEliminator';
import { ActivityFinder } from '../../context/Activity/application/ActivityFinder';
import { ActivityUpdater } from '../../context/Activity/application/ActivityUpdater';
import { ActivityRepository } from '../../context/Activity/domain/interfaces/ActivityRepository.interface';
import { Repositories } from './repositories.injector';

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

  container.setService(
    ActivityUsesCases.ActivityCreator,
    () => new ActivityCreator(activityRepository)
  );
  container.setService(
    ActivityUsesCases.ActivityUpdater,
    () => new ActivityUpdater(activityRepository)
  );
  container.setService(
    ActivityUsesCases.ActivityDeleter,
    () => new ActivityEliminator(activityRepository)
  );
  container.setService(
    ActivityUsesCases.ActivityFinder,
    () => new ActivityFinder(activityRepository)
  );

  return container;
};
