import { Instalation } from '../domain/instalation.model';
import { InstalationRepository } from '../domain/interfaces/instalation.respository';

export class InstalationUpdater {
  constructor(private instalationRepository: InstalationRepository) {}

  public async update(instalation: Instalation): Promise<Instalation> {
    return await this.instalationRepository.update(instalation);
  }
}
