import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SnapshotDocObject, SnapshotSchema } from './schemas/snapshots.schema';
import { SnapshotsController } from './snapshots.controller';
import { SnapshotsService } from './snapshots.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SnapshotDocObject.name, schema: SnapshotSchema },
    ]),
  ],
  controllers: [SnapshotsController],
  providers: [SnapshotsService],
  exports: [SnapshotsService],
})
export class SnapshotsModule {}
