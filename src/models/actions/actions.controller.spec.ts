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
import { Action } from './interfaces/action.interface';

describe('ActionsController', () => {
  let controller: ActionsController;
  let service: ActionsService;

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
        _id: new ObjectId(),
        issued_timestamp: new Date(),
        action_type: 'TAKEN',
        status: 'UNRESOLVED',
        metric: 'water',
        message: 'Watered plant',
        level_needed: 0.5,
        current_snapshot: {
          _id: new ObjectId(),
          timestamp: new Date(),
          moisture: 0.7,
          light: 0.8,
          temperature: 25,
        },
      };

      jest.spyOn(service, 'create').mockResolvedValue(createdAction);

      const requestBody = {
        issued_timestamp: createdAction.issued_timestamp.toISOString(),
        action_type: createdAction.action_type,
        metric: createdAction.metric,
        message: createdAction.message,
        level_needed: createdAction.level_needed,
        current_snapshot: createdAction.current_snapshot,
      };

      expect(await controller.createAction(requestBody)).toBe(createdAction);
      expect(service.create).toHaveBeenCalledWith(requestBody);
    });
  });

  describe('resolveAction', () => {
    it('should update the action with resolved status and return the updated action', async () => {
      const actionId = new ObjectId();
      const resolvedTimestamp = new Date();
      const message = 'Action resolved';
      const currentSnapshot = {
        _id: new ObjectId(),
        timestamp: new Date(),
        moisture: 0.7,
        light: 0.8,
        temperature: 25,
      };

      const updatedAction: Action = {
        _id: actionId,
        issued_timestamp: new Date(),
        action_type: 'TAKEN',
        status: 'RESOLVED',
        metric: 'water',
        message,
        level_needed: 0.5,
        current_snapshot,
      };

      jest.spyOn(service, 'resolve').mockResolvedValue(updatedAction);

      const requestBody = {
        action_id: actionId.toHexString(),
        resolved_timestamp: resolvedTimestamp.toISOString(),
        message,
        current_snapshot,
      };

      expect(await controller.resolveAction(requestBody)).toBe(updatedAction);
      expect(service.resolve).toHaveBeenCalledWith(requestBody);
    });
  });
});

