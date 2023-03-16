import { Body, Controller, Post } from '@nestjs/common';
import { PushTokenRegistrationEntry } from './interfaces/pushTokenRegistrationEntry.interface';
import { PushService } from './push.service';

@Controller('push')
export class PushController {
  constructor(private pushService: PushService) {}

  @Post('register')
  async register(@Body() entry: PushTokenRegistrationEntry) {
    this.pushService.register(entry);
  }
}
