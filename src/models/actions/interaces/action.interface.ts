import { Snapshot } from "src/models/snapshots/interfaces/snapshot.interface";

export interface Action {
    action_id: string;
    timestamp: Date;
    action_type: ActionType;
    status: ActionStatus;
    metric: string;
    message: string;
    level: number;
    current_snapshot: Snapshot;
};

export enum ActionType {TAKEN, NEEDED};
export enum ActionStatus {RESOLVED, UNRESOLVED};