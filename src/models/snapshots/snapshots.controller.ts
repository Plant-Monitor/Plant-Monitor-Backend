import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateSnapshotDto } from './dto/create-snapshot.dto';
import { Snapshot } from './interfaces/snapshot.interface';
import { SnapshotsService } from './snapshots.service';

@Controller('snapshots')
export class SnapshotsController {
  constructor(private snapshotsService: SnapshotsService) {}

  @Get()
  async findOne(@Query('id') id: string): Promise<Snapshot | null> {
    return this.snapshotsService.findOne(id);
  }

  @Post()
  async create(@Body() createSnapshotDto: CreateSnapshotDto) {
    this.snapshotsService.create(createSnapshotDto);
  }
}
