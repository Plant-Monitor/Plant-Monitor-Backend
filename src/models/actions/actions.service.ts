import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSnapshotDto } from '../snapshots/dto/create-snapshot.dto';
import { ResolveActionDto } from './dto/resolveAction.dto';
import { Action } from './interaces/action.interface';
import { ActionDocObject, ActionDocument } from './schemas/actions.schema';

@Injectable()
export class ActionsService {
    constructor(
        @InjectModel(
            ActionDocObject.name,
            process.env.NODE_ENV
        )
        private readonly actionModel: Model<ActionDocument>,
    ) {}

    async create(action: Action): Promise<ActionDocObject> {
        const createdAction = await this.actionModel.create(action);
        // todo: Create and send push notification
        return createdAction;
    }

    async resolve(resolveActionDto: ResolveActionDto) {
        return;
    }
}
