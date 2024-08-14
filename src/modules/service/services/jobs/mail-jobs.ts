import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { forwardRef, Inject } from '@nestjs/common';
import { MailTypeJob } from '../../../../constants/jobs/mail-type-jobs';
import { MailBusinessService } from '../mail-business.service';

@Processor(MailTypeJob.MAIL.NAME)
export class MailJobs {
  constructor(
    @Inject(forwardRef(() => MailBusinessService))
    private readonly mailService: MailBusinessService,
  ) {}
  @Process(MailTypeJob.MAIL.CREATE_JOB)
  async sendEmailJob(job: Job<{ body: any }>) {
    return await this.mailService.sendEmailJob(job.data['items']);
  }
}
