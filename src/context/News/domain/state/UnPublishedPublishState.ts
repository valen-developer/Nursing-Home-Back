import { BasePublishState } from "./BaseNewsPublishState";
import {
  AllowedNewsPublishStates,
  NewsPublishState,
} from "./NewsPublishState.interface";
import { PublishedPublishState } from "./PublishedPublishState";

export class UnPublishedPublishState extends BasePublishState {
  publish(): NewsPublishState {
    return new PublishedPublishState();
  }

  isPublished(): boolean {
    return false;
  }

  toString(): AllowedNewsPublishStates {
    return this.UNPUBLISHED;
  }
}
