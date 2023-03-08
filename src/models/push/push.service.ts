import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PushTokenRegistrationEntry } from './interfaces/pushTokenRegistrationEntry.interface';
import { PushTokenRegistrationDocObject, PushTokenRegistrationDocument } from './schemas/pushTokenRegistration.schema';

@Injectable()
export class PushService {
    constructor(
        @InjectModel(
            PushTokenRegistrationDocObject.name,
            process.env.NODE_ENV
        )
        private readonly tokenRegistrationModel: Model<PushTokenRegistrationDocument>,
    ) {}

    async register(
        entry: PushTokenRegistrationEntry
    ): Promise<PushTokenRegistrationDocObject> {
        return await this.tokenRegistrationModel.findOneAndUpdate(
            {user_id: entry.user_id},
            entry,
            {new: true, upsert: true}
        );
    }
}
