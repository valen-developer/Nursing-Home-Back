import { ValueObject } from '../../../shared/domain/valueObject/valueObject.interface';

export class PlateReceipe implements ValueObject {
  public readonly value: string | null | undefined;

  constructor(value: string | null | undefined) {
    this.value = value;
  }

  public has(): boolean {
    const hasReceipe = !!this.value;

    return hasReceipe;
  }
}
