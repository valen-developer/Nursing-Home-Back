import { ValueObject } from "../../../shared/domain/valueObject/valueObject.interface";

export class NewsSubtitle implements ValueObject {
  public readonly value: string;

  constructor(newsSubtitle: string) {
    this.value = newsSubtitle;
  }
}
