import { Module } from '@nestjs/common';
import { MailController } from './controller/mail.controller';
import { ServiceModule } from '../service/service.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import {
  MailCallBackJob,
  MailTypeJob,
} from '../../constants/jobs/mail-type-jobs';

@Module({
  imports: [
    ServiceModule,
    TypeOrmModule.forFeature([]),
    BullModule.registerQueue({
      name: MailTypeJob.MAIL.NAME,
    }),
    BullModule.registerQueue({
      name: MailCallBackJob.CALLBACK.NAME,
    }),
  ],
  controllers: [MailController],
  exports: [],
  providers: [],
})
export class BusinessModule {}
