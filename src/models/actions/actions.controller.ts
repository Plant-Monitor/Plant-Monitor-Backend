import { Body, Controller, Post, Put } from '@nestjs/common';
import { ActionsService } from './actions.service';
import { ResolveActionDto } from './dto/resolveAction.dto';
import { Action } from './interfaces/action.interface';

@Controller('actions')
export class ActionsController {
    constructor(private actionsService: ActionsService) {}

    @Post('create')
    async create(@Body() createActionDto: Action) {
        this.actionsService.create(createActionDto);
    }

    @Put('resolve')
    async update(@Body() resolveActionDto: ResolveActionDto) {
        this.actionsService.resolve(resolveActionDto);
    }
}
