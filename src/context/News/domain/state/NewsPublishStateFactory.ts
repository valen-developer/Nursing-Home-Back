import { HTTPException } from "../../../shared/domain/httpException";
import {
  AllowedNewsPublishStates,
  NewsPublishState,
} from "./NewsPublishState.interface";
import { PublishedPublishState } from "./PublishedPublishState";
import { UnPublishedPublishState } from "./UnPublishedPublishState";

export class NewsPublishStateFactory {
  public static readonly PUBLISHED: AllowedNewsPublishStates = "PUBLISHED";
  public static readonly UNPUBLISHED: AllowedNewsPublishStates = "UNPUBLISHED";

  public static create(): NewsPublishState {
    return new UnPublishedPublishState();
  }

  public static fromString(state: AllowedNewsPublishStates): NewsPublishState {
    switch (state) {
      case NewsPublishStateFactory.PUBLISHED:
        return new PublishedPublishState();
      case NewsPublishStateFactory.UNPUBLISHED:
        return new UnPublishedPublishState();
      default:
        throw new HTTPException("news publish state", "invalid state", 400);
    }
  }
}
