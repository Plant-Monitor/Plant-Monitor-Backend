import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configuration } from './config/configuration';
import mongoConfig from './config/database/mongo/mongo.config';
import { ActionsModule } from './models/actions/actions.module';
import { PushModule } from './models/push/push.module';
import { SnapshotsModule } from './models/snapshots/snapshots.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      load: [configuration, mongoConfig]
    }),
    SnapshotsModule,
    ActionsModule,
    PushModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongodb.uri'),
        dbName: configService.get<string>('mongodb.user_db')
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

console.log(`db uri: ${process.env.MONGO_URI}`);