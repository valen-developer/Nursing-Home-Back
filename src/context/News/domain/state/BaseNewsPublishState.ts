import { HTTPException } from "../../../shared/domain/httpException";
import { NewsPublishState } from "./NewsPublishState.interface";
import { AllowedNewsPublishStates } from "./NewsPublishStateFactory";

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
