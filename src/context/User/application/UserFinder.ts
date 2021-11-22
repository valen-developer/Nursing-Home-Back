import { ImageRepository } from '../../shared/domain/interfaces/image.repository';
import { UserRepository } from '../domain/interfaces/user.repository';
import { User } from '../domain/user.model';

export class UserFinder {
  constructor(
    private userRepository: UserRepository,
    private imageRepository: ImageRepository
  ) {}

  public async getUser(uuid: string): Promise<User> {
    return await this.userRepository.get(uuid).then((user) => {
      return this.setUserImage(user);
    });
  }

  public async getByEmail(email: string): Promise<User> {
    return await this.userRepository.getByEmail(email).then((user) => {
      return this.setUserImage(user);
    });
  }

  public async getAll(): Promise<User[]> {
    return await this.userRepository.getAll().then(async (users) => {
      console.log(
        '🚀 -> UserFinder -> returnawaitthis.userRepository.getAll -> users',
        users
      );
      const userWithImage = await Promise.all(
        users.map(async (user) => {
          return await this.setUserImage(user);
        })
      );
      console.log(
        '🚀 -> UserFinder -> returnawaitthis.userRepository.getAll -> userWithImage',
        userWithImage
      );

      return userWithImage;
    });
  }

  private async setUserImage(user: User): Promise<User> {
    return await this.imageRepository
      .getByEntityUuid(user.uuid.value)
      .then((image) => {
        console.log('🚀 -> UserFinder -> .then -> image', image);
        if (image.length <= 0) return user;

        user.setImagePath(image[0].path.value);
        return user;
      });
  }
}
