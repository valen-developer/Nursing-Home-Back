import { asyncForEach } from "../../../helpers/asynForeach";
import { Image } from "../../shared/domain/image.model";
import { ImageRepository } from "../../shared/domain/interfaces/image.repository";
import { UuidGenerator } from "../../shared/infrastructure/uuidGenerator";
import { PlateRepository } from "../domain/interfaces/PlateRepository.interface";
import { Plate } from "../domain/plate.model";

export class PlateUpdater {
  constructor(
    private plateRepository: PlateRepository,
    private imageRepository: ImageRepository,
    private uuidGenerator: UuidGenerator
  ) {}

  public async updatePlate(plate: Plate) {
    const updatedPlate = await this.plateRepository.updatePlate(plate);

    const images = updatedPlate.imagePaths.map(
      (path) =>
        new Image({
          path,
          entityUuid: updatedPlate.uuid.value,
          uuid: this.uuidGenerator.generate(),
        })
    );

    await asyncForEach<Image>(
      images,
      async (image) => await this.imageRepository.create(image)
    );

    return updatedPlate;
  }
}
