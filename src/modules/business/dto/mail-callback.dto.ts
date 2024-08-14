import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { VALIDATION_MAIL } from '../types/validations';
import { SanitizeHtml, Trim } from '../../../decorators/transform.decorators';
import {
  IsUndefinable,
  TransformBoolean,
} from '../../../decorators/validator.decorators';

export class MailCallBackDto {
  @ApiProperty()
  @Trim()
  @SanitizeHtml()
  @IsString()
  @MaxLength(250, { message: VALIDATION_MAIL.MAIL.to.MAX })
  @IsEmail({}, { message: VALIDATION_MAIL.MAIL.to.INVALID })
  @IsNotEmpty({ message: VALIDATION_MAIL.MAIL.to.REQUIRED })
  to: string;

  @ApiProperty()
  @Trim()
  @SanitizeHtml()
  @IsString()
  @MaxLength(250, { message: VALIDATION_MAIL.MAIL.subject.MAX })
  @IsNotEmpty({ message: VALIDATION_MAIL.MAIL.subject.REQUIRED })
  subject: string;

  @ApiProperty()
  @Trim()
  @SanitizeHtml()
  @IsString()
  @IsNotEmpty({ message: VALIDATION_MAIL.MAIL.content.REQUIRED })
  content: string;

  @ApiPropertyOptional()
  @IsUndefinable()
  status: number;
}
