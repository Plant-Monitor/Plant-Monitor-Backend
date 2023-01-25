import { Snapshot, HealthProperty } from '../interfaces/snapshot.interface';

export class CreateSnapshotDto implements Snapshot {
  user_id: string;
  plant_id: string;
  timestamp: Date;
  health_properties: Map<string, HealthProperty>;
}
