import { BasePublishState } from "./BaseNewsPublishState";
import { NewsPublishState } from "./NewsPublishState.interface";
import { AllowedNewsPublishStates } from "./NewsPublishStateFactory";
import { PublishedPublishState } from "./PublishedPublishState";

export class DraftPublishState extends BasePublishState {
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
