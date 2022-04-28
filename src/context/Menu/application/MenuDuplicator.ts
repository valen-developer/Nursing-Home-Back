import { asyncMap } from "../../../helpers/asyncMap";
import { asyncForEach } from "../../../helpers/asynForeach";
import { PlateCreator } from "../../Plate/application/PlateCreator";
import { Plate } from "../../Plate/domain/plate.model";
import { ImageDuplicator } from "../../shared/application/imageDuplicator";
import { Image } from "../../shared/domain/image.model";
import { ImageRepository } from "../../shared/domain/interfaces/image.repository";
import { UuidGenerator } from "../../shared/infrastructure/uuidGenerator";
import { Menu } from "../domain/Menu.model";
import { MenuCreator } from "./MenuCreator";
import { MenuFinder } from "./MenuFinder";

export class MenuDuplicator {
  constructor(
    private menuFinder: MenuFinder,
    private menuCreator: MenuCreator,
    private plateCreator: PlateCreator,
    private uuidGenerator: UuidGenerator,
    private imageDuplicator: ImageDuplicator,
    private imageRepository: ImageRepository
  ) {}

  public async duplicateByDate(menuUuid: string, newDate: Date): Promise<Menu> {
    const menuToDuplicate = await this.menuFinder.findByUuid(menuUuid);

    const newMenu = new Menu({
      ...menuToDuplicate.toObject(),
      uuid: this.uuidGenerator.generate(),
      date: newDate,
    });

    await this.menuCreator.create(newMenu);

    const newPlates = await this.duplicatePlates(
      newMenu.uuid.value,
      menuToDuplicate.plates,
      newDate
    );
    newMenu.clearPlates();
    newMenu.addPlates(newPlates);

    return newMenu;
  }

  private async duplicatePlates(
    menuUuid: string,
    plates: Plate[],
    date: Date
  ): Promise<Plate[]> {
    const newPlates = await asyncMap(plates, async (plate) => {
      const images = await this.imageRepository.getByEntityUuid(
        plate.uuid.value
      );

      const plateHour = plate.date.value.getHours();
      const plateMinute = plate.date.value.getMinutes();
      const newDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        plateHour,
        plateMinute
      );

      const newPlate = new Plate({
        ...plate.toObject(),
        uuid: this.uuidGenerator.generate(),
        date: newDate,
        menuUuid,
      });

      const newImages = await this.duplicateImages(images, newPlate.uuid.value);
      newPlate.setImages(newImages);
      return newPlate;
    });

    const newPlatesCopy = newPlates.map(
      (p) =>
        new Plate({
          ...p.toObject(),
          imagePaths: [],
        })
    );

    await asyncForEach<Plate>(newPlatesCopy, async (plate) => {
      await this.plateCreator.create(plate);
    });

    return newPlates;
  }

  private duplicateImages(
    images: Image[],
    entityUuid: string
  ): Promise<Image[]> {
    return asyncMap(images, async (image: Image) => {
      const newImage = await this.imageDuplicator.duplicateImage(
        new Image({
          ...image.toObject(),
          entityUuid,
          uuid: this.uuidGenerator.generate(),
        }),
        entityUuid
      );

      return newImage;
    });
  }
}
