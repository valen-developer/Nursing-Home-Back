import { NewsPublishStateFactory } from "./NewsPublishStateFactory";

export type AllowedNewsPublishStates = "PUBLISHED" | "UNPUBLISHED";

export abstract class NewsPublishState {
  protected PUBLISHED: AllowedNewsPublishStates =
    NewsPublishStateFactory.PUBLISHED;
  protected UNPUBLISHED: AllowedNewsPublishStates =
    NewsPublishStateFactory.UNPUBLISHED;

  constructor() {}

  abstract publish(): NewsPublishState;
  abstract unPublish(): NewsPublishState;
  abstract isPublished(): boolean;
  abstract toString(): AllowedNewsPublishStates;
}
