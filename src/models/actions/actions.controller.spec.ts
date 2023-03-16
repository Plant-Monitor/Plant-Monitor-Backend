// import { Test, TestingModule } from '@nestjs/testing';
// import { ActionsController } from './actions.controller';

// describe('ActionsController', () => {
//   let controller: ActionsController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [ActionsController],
//     }).compile();

//     controller = module.get<ActionsController>(ActionsController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });

// actions.controller.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { ActionsController } from './actions.controller';
import { ActionsService } from './actions.service';
import { v4 as uuidv4 } from 'uuid';
import {
  Action,
  ActionStatus,
  ActionType,
} from './interfaces/action.interface';
import {
  HealthProperty,
  Interpretation,
} from '../snapshots/interfaces/snapshot.interface';
import { ResolveActionDto } from './dto/resolveAction.dto';
import { ExpoPushToken } from 'expo-server-sdk';

describe('ActionsController', () => {
  let controller: ActionsController;
  let service: ActionsService;
  const expoToken: ExpoPushToken = 'ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActionsController],
      providers: [
        ActionsService,
        {
          provide: getModelToken('Action'),
          useValue: {
            create: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ActionsController>(ActionsController);
    service = module.get<ActionsService>(ActionsService);
  });

  describe('createAction', () => {
    it('should create a new action and return the created action', async () => {
      const createdAction: Action = {
        action_id: uuidv4(),
        timestamp: new Date(),
        action_type: ActionType.TAKEN,
        status: ActionStatus.UNRESOLVED,
        metric: 'moisture',
        message: 'Watering plant',
        level_needed: 0.5,
        current_snapshot: {
          user_id: uuidv4(),
          plant_id: uuidv4(),
          timestamp: new Date(),
          health_properties: new Map<string, HealthProperty>([
            [
              'moisture',
              {
                level: 0.3,
                unit: 'deg C',
                interpretation: Interpretation.CRITICAL,
              },
            ],
            [
              'light',
              {
                level: 3,
                unit: 'lumens',
                interpretation: Interpretation.OKAY,
              },
            ],
            [
              'temperature',
              {
                level: 20,
                unit: 'deg C',
                interpretation: Interpretation.OKAY,
              },
            ],
          ]),
        },
      };

      jest.spyOn(service, 'create').mockResolvedValue(createdAction);

      const requestBody = {
        action_id: createdAction.action_id,
        timestamp: createdAction.timestamp,
        action_type: createdAction.action_type,
        status: createdAction.status,
        metric: createdAction.metric,
        message: createdAction.message,
        level_needed: createdAction.level_needed,
        current_snapshot: createdAction.current_snapshot,
      };

      // expect(await controller.create(requestBody)).toBe(createdAction);
      expect(service.create).toHaveBeenCalledWith(requestBody);
    });
  });

  describe('resolveAction', () => {
    it('should update the action with resolved status and return the updated action', async () => {
      const action_id = uuidv4();
      const createdAction: Action = {
        action_id: action_id,
        timestamp: new Date(),
        action_type: ActionType.TAKEN,
        status: ActionStatus.UNRESOLVED,
        metric: 'moisture',
        message: 'Watering plant',
        level_needed: 0.5,
        current_snapshot: {
          user_id: uuidv4(),
          plant_id: uuidv4(),
          timestamp: new Date(),
          health_properties: new Map<string, HealthProperty>([
            [
              'moisture',
              {
                level: 0.3,
                unit: 'deg C',
                interpretation: Interpretation.CRITICAL,
              },
            ],
            [
              'light',
              {
                level: 3,
                unit: 'lumens',
                interpretation: Interpretation.OKAY,
              },
            ],
            [
              'temperature',
              {
                level: 20,
                unit: 'deg C',
                interpretation: Interpretation.OKAY,
              },
            ],
          ]),
        },
      };

      const updatedAction: ResolveActionDto = {
        action_id: action_id,
        timestamp: new Date(),
        message: 'Resolving moisture',
        current_snapshot: {
          user_id: uuidv4(),
          plant_id: uuidv4(),
          timestamp: new Date(),
          health_properties: new Map<string, HealthProperty>([
            [
              'moisture',
              {
                level: 0.6,
                unit: 'deg C',
                interpretation: Interpretation.CRITICAL,
              },
            ],
            [
              'light',
              {
                level: 3,
                unit: 'lumens',
                interpretation: Interpretation.OKAY,
              },
            ],
            [
              'temperature',
              {
                level: 20,
                unit: 'deg C',
                interpretation: Interpretation.OKAY,
              },
            ],
          ]),
        },
      };

      jest.spyOn(service, 'resolve').mockResolvedValue();

      const requestBody = {
        action_id: updatedAction.action_id,
        timestamp: updatedAction.timestamp,
        message: updatedAction.message,
        current_snapshot: updatedAction.current_snapshot,
      };

      expect(await controller.update(requestBody)).toBe(updatedAction);
      expect(service.resolve).toHaveBeenCalledWith(requestBody);
    });
  });
});
