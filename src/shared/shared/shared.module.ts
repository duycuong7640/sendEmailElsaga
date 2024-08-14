import { HttpModule } from '@nestjs/axios';
import { Module, Global } from '@nestjs/common';
import { ApiConfigService } from './services/api-config.service';
import { ValidatorService } from './services/validator.service';
import { GeneratorService } from './services/generator.service';

const providers = [ApiConfigService, ValidatorService, GeneratorService];
@Global()
@Module({
  imports: [HttpModule],
  providers,
  exports: [...providers, HttpModule],
})
export class SharedModule {}
