import { NotNull } from "../../../shared/domain/notNull";
import { ValueObject } from "../../../shared/domain/valueObject/valueObject.interface";

export class NewsContent extends NotNull implements ValueObject {
  public readonly value: string;

  constructor(value: string) {
    super(value, "news content");
    this.value = value;
  }
}
