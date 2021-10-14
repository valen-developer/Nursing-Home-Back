import { Instalation } from '../instalation.model';

export abstract class InstalationRepository {
  public abstract create(instalation: Instalation): Promise<void>;
  public abstract update(instalation: Instalation): Promise<Instalation>;
  public abstract delete(uuid: string): Promise<void>;
  public abstract get(uuid: string): Promise<Instalation>;
  public abstract getAll(): Promise<Instalation[]>;
}
