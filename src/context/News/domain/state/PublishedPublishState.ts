import { BasePublishState } from "./BaseNewsPublishState";
import { NewsPublishState } from "./NewsPublishState.interface";
import { AllowedNewsPublishStates } from "./NewsPublishStateFactory";
import { DraftPublishState } from "./UnPublishedPublishState";

export class PublishedPublishState extends BasePublishState {
  unPublish(): NewsPublishState {
    return new DraftPublishState();
  }

  isPublished(): boolean {
    return true;
  }

  toString(): AllowedNewsPublishStates {
    return this.PUBLISHED;
  }
}
