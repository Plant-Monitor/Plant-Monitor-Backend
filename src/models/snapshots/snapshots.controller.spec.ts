import { Test, TestingModule } from '@nestjs/testing';
import { SnapshotDocObject, SnapshotDocument, SnapshotSchema } from './schemas/snapshots.schema';
import { SnapshotsController } from './snapshots.controller';
import { v4 as uuidv4 } from 'uuid';
import { SnapshotsService } from './snapshots.service';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';

describe('SnapshotsController', () => {
  let controller: SnapshotsController;
  let service: SnapshotsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SnapshotsController],
      providers: [
        SnapshotsService,
        {
          provide: getModelToken(SnapshotDocObject.name),
          useValue: SnapshotSchema,
        },
      ],
    }).compile();

    controller = module.get<SnapshotsController>(SnapshotsController);
    service = module.get<SnapshotsService>(SnapshotsService)
  });

  describe('findOne', () => {
    it('should return the snapshot that was just created', async () => {
      const user_id = uuidv4();
      
      const result = new SnapshotDocObject();
      result.user_id = user_id;
      result.plant_id = uuidv4()
      result.timestamp = new Date();

      jest.spyOn(service, 'findOne').mockImplementation(
        () => new Promise((resolve, reject) => resolve(result))
      );

      expect(await controller.findOne(user_id)).toMatchObject(result);
    })
  })

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
