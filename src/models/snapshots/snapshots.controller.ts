import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateSnapshotDto } from './dto/create-snapshot.dto';
import { Snapshot } from './interfaces/snapshot.interface';
import { SnapshotsService } from './snapshots.service';

@Controller('snapshots')
export class SnapshotsController {
  constructor(private snapshotsService: SnapshotsService) {}

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Snapshot> {
    return this.snapshotsService.findOne(id);
  }

  @Post()
  async create(@Body() createSnapshotDto: CreateSnapshotDto) {
    this.snapshotsService.create(createSnapshotDto);
  }
}
