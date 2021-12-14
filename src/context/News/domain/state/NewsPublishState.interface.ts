import {
  AllowedNewsPublishStates,
  NewsPublishStateFactory,
} from "./NewsPublishStateFactory";

export abstract class NewsPublishState {
  protected PUBLISHED: AllowedNewsPublishStates =
    NewsPublishStateFactory.PUBLISHED;
  protected UNPUBLISHED: AllowedNewsPublishStates =
    NewsPublishStateFactory.DRAFT;

  constructor() {}

  abstract publish(): NewsPublishState;
  abstract unPublish(): NewsPublishState;
  abstract isPublished(): boolean;
  abstract toString(): AllowedNewsPublishStates;
}
