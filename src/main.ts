import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SharedModule } from './shared/shared/shared.module';
import { ApiConfigService } from './shared/shared/services/api-config.service';
import { setupSwagger } from './docs/setup-swagger';
import { useContainer } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.select(SharedModule).get(ApiConfigService);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: false,
      whitelist: true,
      transform: true,
    }),
  );

  if (configService.enableSwagger) {
    setupSwagger(app);
  }

  await app.listen(configService.appConfig.port);
}
bootstrap();
