import { Module } from '@nestjs/common';
import { ApiConfigService } from '../../../shared/shared/services/api-config.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mail.service';
import { BullModule } from '@nestjs/bull';
import {
  MailCallBackJob,
  MailTypeJob,
} from '../../../constants/jobs/mail-type-jobs';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ApiConfigService) => ({
        transport: {
          host: config.mailConfig.host,
          port: 587,
          secure: false,
          auth: {
            user: config.mailConfig.user,
            pass: config.mailConfig.password,
          },
        },
        defaults: {
          from: `"${config.mailConfig.name}" <${config.mailConfig.from}>`,
        },
        template: {
          dir:
            __dirname.replace('dist/', '').replace('dist\\', '') +
            '/../../../modules/service/mail/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ApiConfigService],
    }),
    BullModule.registerQueue({
      name: MailTypeJob.MAIL.NAME,
    }),
    BullModule.registerQueue({
      name: MailCallBackJob.CALLBACK.NAME,
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
