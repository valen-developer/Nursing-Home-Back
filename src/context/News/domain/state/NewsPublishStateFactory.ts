import { HTTPException } from "../../../shared/domain/httpException";
import { NewsPublishState } from "./NewsPublishState.interface";
import { PublishedPublishState } from "./PublishedPublishState";
import { DraftPublishState } from "./UnPublishedPublishState";

export type AllowedNewsPublishStates = "PUBLISHED" | "DRAFT";

export class NewsPublishStateFactory {
  public static readonly PUBLISHED: AllowedNewsPublishStates = "PUBLISHED";
  public static readonly DRAFT: AllowedNewsPublishStates = "DRAFT";

  public static create(): NewsPublishState {
    return new DraftPublishState();
  }

  public static fromString(state: AllowedNewsPublishStates): NewsPublishState {
    switch (state) {
      case NewsPublishStateFactory.PUBLISHED:
        return new PublishedPublishState();
      case NewsPublishStateFactory.DRAFT:
        return new DraftPublishState();
      default:
        throw new HTTPException("news publish state", "invalid state", 400);
    }
  }
}
