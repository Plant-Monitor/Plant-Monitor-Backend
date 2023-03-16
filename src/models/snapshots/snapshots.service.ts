import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSnapshotDto } from './dto/create-snapshot.dto';
import {
  SnapshotDocObject,
  SnapshotDocument,
} from './schemas/snapshots.schema';

@Injectable()
export class SnapshotsService {
  constructor(
    @InjectModel(SnapshotDocObject.name, process.env.NODE_ENV)
    private readonly snapshotModel: Model<SnapshotDocument>,
  ) {}

  async findOne(id: string): Promise<SnapshotDocObject | null> {
    return this.snapshotModel
      .findOne({
        user_id: id,
      })
      .sort({
        created_at: -1,
      })
      .exec();
  }

  async create(
    createSnapshotDto: CreateSnapshotDto,
  ): Promise<SnapshotDocObject> {
    const createdSnapshot = await this.snapshotModel.create(createSnapshotDto);
    return createdSnapshot;
  }
}
