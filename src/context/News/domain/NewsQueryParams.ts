import { AllowedNewsPublishStates } from "./state/NewsPublishStateFactory";

export interface NewsQueryParams {
  title_contains?: string;
  subtitle_contains?: string;
  own_contains?: string;
  ownName_contains?: string;
  createdAt_gt?: Date;
  createdAt_gte?: Date;
  createdAt_lt?: Date;
  createdAt_lte?: Date;
  updatedAt_gt?: Date;
  updatedAt_gte?: Date;
  updatedAt_lt?: Date;
  updatedAt_lte?: Date;
  updaterName_contains?: string;
  publishingState_equal?: AllowedNewsPublishStates;
}
