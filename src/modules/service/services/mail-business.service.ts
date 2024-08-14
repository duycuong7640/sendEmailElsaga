import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { MailTypeJob } from '../../../constants/jobs/mail-type-jobs';
import { MailSentDto } from '../../business/dto/mail-sent.dto';
import { VALIDATION_MAIL } from '../../business/types/validations';
import { MailService } from '../mail/mail.service';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ApiConfigService } from '../../../shared/shared/services/api-config.service';

@Injectable()
export class MailBusinessService {
  constructor(
    private dataSource: DataSource,
    private mailService: MailService,
    private httpService: HttpService,
    private apiConfigService: ApiConfigService,
    @InjectQueue(MailTypeJob.MAIL.NAME)
    private readonly usedQueue: Queue,
  ) {}

  async sendData(attrs: MailSentDto, headers: any) {
    if (
      headers &&
      typeof headers.token !== 'undefined' &&
      this.apiConfigService.apiToken === headers.token
    ) {
      if (typeof attrs.listEmails !== 'undefined' && attrs.listEmails.length) {
        await this.usedQueue.add(
          MailTypeJob.MAIL.CREATE_JOB,
          {
            items: attrs,
            metaData: {},
          },
          { removeOnComplete: true, removeOnFail: true },
        );
      } else {
        throw new BadRequestException(VALIDATION_MAIL.SYSTEM.ERROR);
      }
    } else {
      throw new BadRequestException(VALIDATION_MAIL.SYSTEM.ERROR);
    }
  }

  async sendEmailJob(attrs: MailSentDto) {
    for (let i = 0; i < attrs.listEmails.length; i++) {
      if (
        typeof attrs.listEmails[i] !== 'undefined' &&
        attrs.listEmails[i] &&
        attrs.listEmails[i].to
      ) {
        const item = attrs.listEmails[i];
        console.log(`Start sent: ${item.to}`);

        await this.mailService.sendMail(item);

        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }
    console.log(`Completed sent total: ${attrs.listEmails.length}`);
  }

  async callBackJob(
    item: { to: string; subject: string; content: string },
    status: boolean,
  ) {
    console.log('Start callBack');
    try {
      const data = {
        status: status ? 200 : 500,
        ...item,
      };

      await lastValueFrom(
        this.httpService.post(
          this.apiConfigService.mailConfig.urlCallback,
          data,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  }
}
