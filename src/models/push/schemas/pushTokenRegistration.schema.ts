import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PushTokenRegistrationEntry } from '../interfaces/pushTokenRegistrationEntry.interface';

export type PushTokenRegistrationDocument =
  HydratedDocument<PushTokenRegistrationDocObject>;

@Schema()
export class PushTokenRegistrationDocObject
  implements PushTokenRegistrationEntry
{
  @Prop()
  user_id: string;

  @Prop()
  token: string;
}

export const PushTokenRegistrationSchema = SchemaFactory.createForClass(
  PushTokenRegistrationDocObject,
);
