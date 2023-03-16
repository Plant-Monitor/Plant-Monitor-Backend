import { Snapshot } from 'src/models/snapshots/interfaces/snapshot.interface';

export class ResolveActionDto {
  action_id: string;
  message: string;
  current_snapshot: Snapshot;
}
