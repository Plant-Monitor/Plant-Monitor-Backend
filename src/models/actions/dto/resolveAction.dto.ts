import { Snapshot } from "src/models/snapshots/interfaces/snapshot.interface";

export class ResolveActionDto {
    action_id: string;
    timestamp: Date;
    message: string;
    current_snapshot: Snapshot;
}