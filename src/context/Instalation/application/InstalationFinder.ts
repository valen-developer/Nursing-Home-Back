import { Instalation } from '../domain/instalation.model';
import { InstalationRepository } from '../domain/interfaces/instalation.respository';

export class InstalationFinder {
  constructor(private instalationRepository: InstalationRepository) {}

  public async get(uuid: string): Promise<Instalation> {
    return await this.instalationRepository.get(uuid);
  }

  public async getAll(): Promise<Instalation[]> {
    return await this.instalationRepository.getAll();
  }
}
