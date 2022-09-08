import { Module } from '@nestjs/common';
import { SNSController, SNSRepository, SNSService } from 'sns';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, SNSController],
  providers: [AppService, SNSService, SNSRepository],
})
export class AppModule {}
