import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: ActionsDocObject.name, schema: ActionsSchema},
        ]),
    ],
    controllers: [ActionsController],
    providers: [ActionsService],
})
export class ActionsModule {}
