import { ImagePath } from "../../shared/domain/valueObject/imagePath.valueObject";
import { UUID } from "../../shared/domain/valueObject/uuid.valueObject";
import { NewsContent } from "./valueObjects/newsContent.valueObject";
import { NewsDate } from "./valueObjects/newsDate.valueObject";
import { NewsOwnName } from "./valueObjects/newsOwnName.valueObject";
import { NewsSubtitle } from "./valueObjects/newsSubtitle.valueObject";
import { NewsTitle } from "./valueObjects/newsTitle.valueObject";

export class News {
  public readonly uuid: UUID;
  public readonly own: UUID;
  public readonly ownName: NewsOwnName;
  public readonly title: NewsTitle;
  public readonly subtitle: NewsSubtitle;
  public readonly content: NewsContent;
  public readonly createdAt: NewsDate;

  private _imagesPath: ImagePath[];

  constructor(news: NewsObject) {
    this.uuid = new UUID(news.uuid);
    this.title = new NewsTitle(news.title);
    this.subtitle = new NewsSubtitle(news.subtitle);
    this.content = new NewsContent(news.content);
    this._imagesPath =
      news.imagesPath?.map((imagePath) => new ImagePath(imagePath)) ?? [];
    this.own = new UUID(news.own);
    this.ownName = new NewsOwnName(news.ownName);
    this.createdAt = new NewsDate(news.createdAt ?? new Date());
  }

  get imagesPath(): string[] {
    return this._imagesPath.map((imagePath) => imagePath.value);
  }

  public setImages(imagesPath: string[]) {
    this._imagesPath = imagesPath.map((imagePath) => new ImagePath(imagePath));
  }

  toObject(): NewsObject {
    return {
      uuid: this.uuid.value,
      title: this.title.value,
      subtitle: this.subtitle.value,
      content: this.content.value,
      imagesPath: this.imagesPath,
      own: this.own.value,
      ownName: this.ownName.value,
      createdAt: this.createdAt.value,
    };
  }
}

export interface NewsObject {
  uuid: string;
  title: string;
  subtitle: string;
  content: string;
  imagesPath: string[];
  own: string;
  ownName: string;
  createdAt: Date;
}
