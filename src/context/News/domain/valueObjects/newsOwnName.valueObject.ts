import { NotNull } from "../../../shared/domain/notNull";
import { ValueObject } from "../../../shared/domain/valueObject/valueObject.interface";

export class NewsOwnName extends NotNull implements ValueObject {
  public readonly value: string;

  constructor(value: string) {
    super(value, "news own name");
    this.value = value;
  }
}
