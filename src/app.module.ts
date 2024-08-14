import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from './shared/shared/shared.module';
import { ApiConfigService } from './shared/shared/services/api-config.service';
import { BullModule } from '@nestjs/bull';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { configValidationSchema } from './validations/config-validation.schema';
import { RouterModule } from '@nestjs/core';
import { BusinessModule } from './modules/business/business.module';
import { ServiceModule } from './modules/service/service.module';
import { MailModule } from './modules/service/mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) =>
        configService.databaseConfig,
      inject: [ApiConfigService],
    }),
    BullModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) => ({
        redis: configService.redisConfig,
      }),
      inject: [ApiConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      renderPath: '/public/*',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    RouterModule.register([
      {
        path: 'api',
        module: BusinessModule,
      },
    ]),
    ConfigModule.forRoot({ validationSchema: configValidationSchema }),
    BusinessModule,
    ServiceModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
