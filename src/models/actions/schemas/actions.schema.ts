import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Snapshot } from 'src/models/snapshots/interfaces/snapshot.interface';
import { SnapshotDocObject } from '../../snapshots/schemas/snapshots.schema';
import {
  Action,
  ActionStatus,
  ActionType,
} from '../interfaces/action.interface';

export type ActionDocument = HydratedDocument<ActionDocObject>;

@Schema()
export class ActionDocObject implements Action {
  @Prop({ required: true })
  action_id: string;
  @Prop({ required: true })
  timestamp: Date;
  @Prop({ type: String, enum: ActionType, required: true })
  action_type: ActionType;
  @Prop({ type: String, enum: ActionStatus, required: true })
  status: ActionStatus;
  @Prop({ required: true })
  metric: string;
  // todo: Make this unrequired
  @Prop({ required: false })
  message: string;
  @Prop({ required: true })
  level_needed: number;
  @Prop({ type: SnapshotDocObject, required: true })
  current_snapshot: Snapshot;
  @Prop({ type: SnapshotDocObject })
  resolution: Snapshot;
}

export const ActionSchema = SchemaFactory.createForClass(ActionDocObject);
