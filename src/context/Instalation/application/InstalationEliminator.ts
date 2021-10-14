import { InstalationRepository } from '../domain/interfaces/instalation.respository';

export class InstalationEliminator {
  constructor(private instalationRepository: InstalationRepository) {}

  public async delete(uuid: string): Promise<void> {
    return await this.instalationRepository.delete(uuid);
  }
}
