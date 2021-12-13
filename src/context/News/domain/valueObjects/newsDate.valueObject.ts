import { NotNull } from "../../../shared/domain/notNull";
import { ValueObject } from "../../../shared/domain/valueObject/valueObject.interface";

export class NewsDate extends NotNull implements ValueObject {
  public readonly value: Date;

  constructor(value: Date) {
    super(value, "news date");
    this.value = value;
  }
}
