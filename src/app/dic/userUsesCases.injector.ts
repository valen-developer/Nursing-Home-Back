import { IOC } from 'dic-ioc';
import { LoginToken } from '../../context/User/application/LoginToken';
import { LoginUser } from '../../context/User/application/LoginUser';
import { UserCreator } from '../../context/User/application/UserCreator';
import { UserEliminator } from '../../context/User/application/UserEliminator';
import { UserFinder } from '../../context/User/application/UserFinder';
import { UserUpdater } from '../../context/User/application/UserUpdater';
import { Repositories } from './repositories.injector';
import { UtilDependencies } from './utils.inhector';

export const enum UserUsesCases {
  UserCreator = 'UserCreator',
  UserEliminator = 'UserEliminator',
  UserFinder = 'UserFinder',
  UserUpdater = 'UserUpdater',
  LoginUser = 'LoginUser',
  LoginUserToken = 'LoginUserToken',
}

export const injectUserUsesCases = (container: IOC): IOC => {
  const userRepository = container.get(Repositories.UserRepository);

  container.setService(
    UserUsesCases.UserCreator,
    () => new UserCreator(userRepository)
  );
  container.setService(
    UserUsesCases.UserEliminator,
    () => new UserEliminator(userRepository)
  );
  container.setService(
    UserUsesCases.UserFinder,
    () => new UserFinder(userRepository)
  );
  container.setService(
    UserUsesCases.UserUpdater,
    () => new UserUpdater(userRepository)
  );

  container.setService(UserUsesCases.LoginUser, (c) => {
    return new LoginUser(
      c.get(Repositories.UserCacheRepository),
      c.get(UserUsesCases.UserFinder),
      c.get(UtilDependencies.Crypt)
    );
  });

  container.setService(UserUsesCases.LoginUserToken, (c) => {
    return new LoginToken(c.get(Repositories.UserCacheRepository));
  });

  return container;
};
