import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PushController } from './push.controller';
import { PushService } from './push.service';
import {
  PushTokenRegistrationDocObject,
  PushTokenRegistrationSchema,
} from './schemas/pushTokenRegistration.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PushTokenRegistrationDocObject.name,
        schema: PushTokenRegistrationSchema,
      },
    ]),
  ],
  controllers: [PushController],
  providers: [PushService],
})
export class PushModule {}
