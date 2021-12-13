import { HTTPException } from "../../../shared/domain/httpException";
import {
  AllowedNewsPublishStates,
  NewsPublishState,
} from "./NewsPublishState.interface";

export class BasePublishState extends NewsPublishState {
  publish(): NewsPublishState {
    return this;
  }
  unPublish(): NewsPublishState {
    return this;
  }
  isPublished(): boolean {
    return false;
  }

  toString(): AllowedNewsPublishStates {
    throw new HTTPException("invalid new publish state", "Invalid state", 400);
  }
}
