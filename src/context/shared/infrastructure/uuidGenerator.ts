import { IUuidGenerator } from '../domain/interfaces/uuidGenerator.interface';

import { v4 } from 'uuid';

export class UuidGenerator implements IUuidGenerator {
  public generate(): string {
    return v4();
  }
}
