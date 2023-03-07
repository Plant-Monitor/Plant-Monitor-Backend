import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActionDocObject, ActionSchema } from './schemas/actions.schema';
import { ActionsController } from './actions.controller';
import { ActionsService } from './actions.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: ActionDocObject.name, schema: ActionSchema},
        ]),
    ],
    controllers: [ActionsController],
    providers: [ActionsService],
})
export class ActionsModule {}
