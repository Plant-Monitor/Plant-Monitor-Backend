import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { HealthProperty, Snapshot } from '../interfaces/snapshot.interface';

export type SnapshotDocument = HydratedDocument<SnapshotDocObject>;

@Schema()
export class SnapshotDocObject implements Snapshot {
  @Prop()
  user_id: string;

  @Prop()
  plant_id: string;

  @Prop()
  timestamp: Date;

  @Prop()
  health_properties: HealthProperty[];
}

export const SnapshotSchema = SchemaFactory.createForClass(SnapshotDocObject);
