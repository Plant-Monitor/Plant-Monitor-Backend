import { Controller, Get, Post } from '@nestjs/common';

@Controller('snapshots')
export class SnapshotsController {
    @Get()
    find(): string {
        return 'stub';
    }

    @Post()
    create(): void {
        return;
    }
}
