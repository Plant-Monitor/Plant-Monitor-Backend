import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import Expo from 'expo-server-sdk';
import { Model } from 'mongoose';
import {
  PushTokenRegistrationDocObject,
  PushTokenRegistrationDocument,
} from '../push/schemas/pushTokenRegistration.schema';
import { ResolveActionDto } from './dto/resolveAction.dto';
import { Action, ActionStatus } from './interfaces/action.interface';
import { ActionDocObject, ActionDocument } from './schemas/actions.schema';
import { ActionType } from './interfaces/action.interface';
import { Snapshot } from '../snapshots/interfaces/snapshot.interface';
import {
  getPushToken,
  sendNotification,
} from 'src/utils/pushNotifications.utils';
import { SnapshotsService } from '../snapshots/snapshots.service';

@Injectable()
export class ActionsService {
  expo: Expo;

  constructor(
    @InjectModel(ActionDocObject.name, process.env.NODE_ENV)
    private readonly actionModel: Model<ActionDocument>,

    @InjectModel(PushTokenRegistrationDocObject.name, process.env.NODE_ENV)
    private readonly tokenRegistrationModel: Model<PushTokenRegistrationDocument>,

    private readonly snapshotsService: SnapshotsService,
  ) {
    this.expo = new Expo();
  }

  async create(action: Action): Promise<ActionDocObject> {
    const createdAction = await this.actionModel.create(action);

    // Store snapshot
    await this.snapshotsService.create(action.current_snapshot);

    // Create and send push notification
    const token = await getPushToken(
      action.current_snapshot.user_id,
      this.tokenRegistrationModel,
    );

    if (token != null) {
      await this.sendNewActionNotification(token, action);
    }

    return createdAction;
  }

  async sendNewActionNotification(token: string, action: Action) {
    await sendNotification(
      this.expo,
      action.metric.toUpperCase(),
      token,
      this.generateNewActionNotifBody(action),
      action,
    );
  }

  generateNewActionNotifBody(action: Action): string {
    switch (action.action_type) {
      case ActionType.TAKEN:
        return `Your plant monitor is now regulating ${action.metric}`;
      case ActionType.NEEDED:
        return `Your plant monitor needs you to regulate ${action.metric}`;
    }
    return 'Sample';
  }

  async resolve(resolveActionDto: ResolveActionDto) {
    const actionDoc = await this.actionModel.findOneAndUpdate(
      { action_id: resolveActionDto.action_id },
      {
        resolution: resolveActionDto.current_snapshot,
        status: ActionStatus[ActionStatus.RESOLVED],
      },
      {
        new: true,
        upsert: true,
      },
    );

    await this.snapshotsService.create(resolveActionDto.current_snapshot);

    const token = await getPushToken(
      actionDoc.current_snapshot.user_id,
      this.tokenRegistrationModel,
    );

    if (token != null) {
      await this.sendActionUpdateNotification(
        token,
        actionDoc.metric,
        resolveActionDto,
      );
    }
    return;
  }

  async sendActionUpdateNotification(
    token: string,
    resolvedMetric: string,
    resolvedAction: ResolveActionDto,
  ) {
    await sendNotification(
      this.expo,
      resolvedMetric.toUpperCase(),
      token,
      `${resolvedMetric} has been fully regulated`,
      resolvedAction,
    );
  }
}
