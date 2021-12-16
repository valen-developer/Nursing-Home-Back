import { HTTPException } from "../../../shared/domain/httpException";
import { Activity, ActivityObject } from "../../domain/activity.model";
import { ActivityRepository } from "../../domain/interfaces/ActivityRepository.interface";
import { ActivityMongoModel } from "./mongoActivity.model";

export class MongoActivityRepository implements ActivityRepository {
  constructor() {}

  async getAll(): Promise<Activity[]> {
    try {
      const activitiesObject: ActivityObject[] =
        await ActivityMongoModel.find().exec();

      return activitiesObject.map((activity) => new Activity(activity));
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async get(uuid: string): Promise<Activity> {
    try {
      const activityMongo: ActivityObject = await ActivityMongoModel.findOne({
        uuid,
      });

      return new Activity(activityMongo);
    } catch (error) {
      throw new HTTPException(
        "mongo activity repository: get",
        "activity not found",
        404
      );
    }
  }

  async create(activity: Activity): Promise<void> {
    const activityMongoModel = new ActivityMongoModel(activity.toObject());

    try {
      await activityMongoModel.save();
    } catch (error: any) {
      const keyPattern = error.keyPattern;
      if (!keyPattern) {
        throw new HTTPException(
          "mongo activity repository:save ",
          "server error",
          500
        );
      }

      const keys = Object.keys(keyPattern);
      throw new HTTPException(
        "mongo activity repository:save ",
        `${keys[0]} already exist`,
        400
      );
    }
  }

  async update(activity: Activity): Promise<Activity> {
    try {
      const response = await ActivityMongoModel.findOneAndUpdate(
        { uuid: activity.uuid.value },
        activity.toObject()
      );

      return activity;
    } catch (error) {
      console.log(error);
      throw new HTTPException(
        "mongo activity repository: update",
        "activity can´t be updated",
        400
      );
    }
  }

  async delete(uuid: string): Promise<void> {
    await ActivityMongoModel.findOneAndDelete({ uuid });
  }
}
