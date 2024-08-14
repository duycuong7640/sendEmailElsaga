import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { forwardRef, Inject } from '@nestjs/common';
import {
  MailCallBackJob,
  MailTypeJob,
} from '../../../../constants/jobs/mail-type-jobs';
import { MailBusinessService } from '../mail-business.service';

@Processor(MailCallBackJob.CALLBACK.NAME)
export class MailCallBackJobs {
  constructor(
    @Inject(forwardRef(() => MailBusinessService))
    private readonly mailService: MailBusinessService,
  ) {}
  @Process(MailCallBackJob.CALLBACK.CREATE_JOB)
  async callBack(job: Job<{ body: any }>) {
    return await this.mailService.callBackJob(
      job.data['item'],
      job.data['status'],
    );
  }
}
