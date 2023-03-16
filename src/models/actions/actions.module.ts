import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActionDocObject, ActionSchema } from './schemas/actions.schema';
import { ActionsController } from './actions.controller';
import { ActionsService } from './actions.service';
import {
  PushTokenRegistrationDocObject,
  PushTokenRegistrationSchema,
} from '../push/schemas/pushTokenRegistration.schema';
import {
  SnapshotDocObject,
  SnapshotSchema,
} from '../snapshots/schemas/snapshots.schema';
import { SnapshotsModule } from '../snapshots/snapshots.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ActionDocObject.name,
        schema: ActionSchema,
      },
      {
        name: PushTokenRegistrationDocObject.name,
        schema: PushTokenRegistrationSchema,
      },
      {
        name: SnapshotDocObject.name,
        schema: SnapshotSchema,
      },
    ]),
    SnapshotsModule,
  ],
  controllers: [ActionsController],
  providers: [ActionsService],
})
export class ActionsModule {}
