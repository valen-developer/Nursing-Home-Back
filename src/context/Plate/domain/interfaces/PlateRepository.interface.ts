import { Plate } from '../plate.model';

export abstract class PlateRepository {
  abstract getPlates(): Promise<Plate[]>;
  abstract getPlatesByDate(date: Date): Promise<Plate[]>;
  abstract getPlatesByMenu(menuUuid: string): Promise<Plate[]>;
  abstract getPlate(uuid: string): Promise<Plate>;
  abstract createPlate(plate: Plate): Promise<Plate>;
  abstract updatePlate(plate: Plate): Promise<Plate>;
  abstract deletePlate(uuid: string): Promise<void>;
}
