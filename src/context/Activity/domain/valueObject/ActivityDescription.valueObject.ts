import { ValueObject } from '../../../shared/domain/valueObject/valueObject.interface';

export class ActivityDescription implements ValueObject {
  constructor(public readonly value: string) {}
}
