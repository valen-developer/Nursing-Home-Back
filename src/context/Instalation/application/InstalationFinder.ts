import { asyncForEach } from "../../../helpers/asynForeach";
import { ImageRepository } from "../../shared/domain/interfaces/image.repository";
import { Instalation } from "../domain/instalation.model";
import { InstalationRepository } from "../domain/interfaces/instalation.respository";

export class InstalationFinder {
  constructor(
    private instalationRepository: InstalationRepository,
    private imageRepository: ImageRepository
  ) {}

  public async get(uuid: string): Promise<Instalation> {
    const instalation = await this.instalationRepository.get(uuid);
    const images = await this.imageRepository.getByEntityUuid(
      instalation.uuid.value
    );
    instalation.setImages(images);

    return instalation;
  }

  public async getAll(): Promise<Instalation[]> {
    const instalation = await this.instalationRepository.getAll();

    await asyncForEach<Instalation>(instalation, async (a) => {
      const images = await this.imageRepository.getByEntityUuid(a.uuid.value);

      a.setImages(images);
    });

    return instalation;
  }
}
