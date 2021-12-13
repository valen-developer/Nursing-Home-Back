import { BasePublishState } from "./BaseNewsPublishState";
import {
  AllowedNewsPublishStates,
  NewsPublishState,
} from "./NewsPublishState.interface";
import { UnPublishedPublishState } from "./UnPublishedPublishState";

export class PublishedPublishState extends BasePublishState {
  unPublish(): NewsPublishState {
    return new UnPublishedPublishState();
  }

  isPublished(): boolean {
    return true;
  }

  toString(): AllowedNewsPublishStates {
    return this.PUBLISHED;
  }
}
