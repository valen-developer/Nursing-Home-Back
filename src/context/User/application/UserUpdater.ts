import { enviroment } from '../../../app/config/enviroment';
import { Image } from '../../shared/domain/image.model';
import { ImageRepository } from '../../shared/domain/interfaces/image.repository';
import { UuidGenerator } from '../../shared/infrastructure/uuidGenerator';
import { UserRepository } from '../domain/interfaces/user.repository';
import { User } from '../domain/user.model';

export class UserUpdater {
  constructor(
    private userRepository: UserRepository,
    private imageRepository: ImageRepository,
    private uuid: UuidGenerator
  ) {}

  public async update(user: User): Promise<User> {
    const updatedUser = await this.userRepository.update(user);

    const imagePath = user.image?.value;
    if (!imagePath) return updatedUser;

    const image = new Image({
      path: imagePath,
      entityUuid: user.uuid.value,
      uuid: this.uuid.generate(),
    });

    await this.imageRepository.create(image);

    return updatedUser;
  }
}
