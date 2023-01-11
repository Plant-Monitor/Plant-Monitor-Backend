import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SnapshotsModule } from './models/snapshots/snapshots.module';

@Module({
  imports: [
    SnapshotsModule,
    MongooseModule.forRoot(
      'mongodb+srv://capstone:capstone@cluster0.otouytp.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
