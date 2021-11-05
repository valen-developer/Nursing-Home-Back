import { Activity } from '../activity.model';

export abstract class ActivityRepository {
  public abstract create(activity: Activity): Promise<void>;
  public abstract update(activity: Activity): Promise<Activity>;
  public abstract delete(uuid: string): Promise<void>;
  public abstract get(uuid: string): Promise<Activity>;
  public abstract getAll(): Promise<Activity[]>;
}
