import { UUID } from '../../shared/domain/valueObject/uuid.valueObject';
import { JobDescription } from './valueObject/Jobdescription.valueObject';
import { JobName } from './valueObject/JobName.valueObject';

export class Job {
  public readonly uuid: UUID;
  public readonly name: JobName;
  public readonly description: JobDescription;

  constructor(job: JobObject) {
    this.uuid = new UUID(job.uuid);
    this.name = new JobName(job.name);
    this.description = new JobDescription(job.description);
  }

  public toObject(): JobObject {
    return {
      uuid: this.uuid.value,
      name: this.name.value,
      description: this.description.value,
    };
  }
}

export interface JobObject {
  uuid: string;
  name: string;
  description: string;
}
