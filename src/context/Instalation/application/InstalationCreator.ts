import { Instalation } from '../domain/instalation.model';
import { InstalationRepository } from '../domain/interfaces/instalation.respository';

export class InstalationCreator {
  constructor(private instalationRepository: InstalationRepository) {}

  public async create(instalation: Instalation): Promise<void> {
    await this.instalationRepository.create(instalation);
  }
}
