import { Image } from "../domain/image.model";
import { ImageRepository } from "../domain/interfaces/image.repository";

export class RandomImageFinder {
  constructor(private readonly imageRepository: ImageRepository) {}

  async findRandomImage(): Promise<Image> {
    return await this.imageRepository.findRandomImage();
  }
}
