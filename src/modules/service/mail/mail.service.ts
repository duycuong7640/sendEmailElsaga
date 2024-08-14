import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ApiConfigService } from '../../../shared/shared/services/api-config.service';
import {
  MailCallBackJob,
  MailTypeJob,
} from '../../../constants/jobs/mail-type-jobs';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private configService: ApiConfigService,
    @InjectQueue(MailTypeJob.MAIL.NAME)
    private readonly usedQueue: Queue,
    @InjectQueue(MailCallBackJob.CALLBACK.NAME)
    private readonly calBackQueue: Queue,
  ) {}

  async sendMail(item: { to: string; subject: string; content: string }) {
    try {
      const sent = await this.mailerService.sendMail({
        to: item.to,
        subject: item.subject,
        template: './content-template',
        context: {
          content: item.content,
        },
      });

      if (sent.rejected.length) {
        await this.callBack(item, false);
      } else {
        await this.callBack(item, true);
      }
    } catch (e) {
      await this.callBack(item, false);
    }
  }

  async callBack(
    item: { to: string; subject: string; content: string },
    status: boolean,
  ) {
    await this.calBackQueue.add(
      MailCallBackJob.CALLBACK.CREATE_JOB,
      {
        item: item,
        status: status,
        metaData: {},
      },
      { removeOnComplete: true, removeOnFail: true },
    );
  }
}
