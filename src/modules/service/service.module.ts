import { forwardRef, Module } from '@nestjs/common';
import { MailBusinessService } from './services/mail-business.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import {
  MailCallBackJob,
  MailTypeJob,
} from '../../constants/jobs/mail-type-jobs';
import { MailJobs } from './services/jobs/mail-jobs';
import { MailService } from './mail/mail.service';
import { MailCallBackJobs } from './services/jobs/callback-jobs';

const services = [MailBusinessService, MailService, MailJobs, MailCallBackJobs];
@Module({
  imports: [
    forwardRef(() => ServiceModule),
    TypeOrmModule.forFeature([]),
    BullModule.registerQueue({
      name: MailTypeJob.MAIL.NAME,
    }),
    BullModule.registerQueue({
      name: MailCallBackJob.CALLBACK.NAME,
    }),
  ],
  providers: [...services],
  exports: services,
})
export class ServiceModule {}
