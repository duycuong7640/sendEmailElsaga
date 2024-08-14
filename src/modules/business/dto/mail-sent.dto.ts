import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { VALIDATION_MAIL } from '../types/validations';
import { SanitizeHtml, Trim } from '../../../decorators/transform.decorators';

export class MailSentDto {
  @ApiProperty({
    description: 'An array of info',
    example: [
      {
        to: 'student@edu.vn',
        subject: 'Thông tin điểm số sinh viên',
        content: 'Nội dung email Note: bao gồm text + html',
      },
    ],
  })
  // @IsUndefinable()
  @Type(() => emailStudentDto)
  @ValidateNested({ each: true })
  @ArrayMinSize(1, {
    message: VALIDATION_MAIL.MAIL.listEmails.MIN,
  })
  @ArrayMaxSize(50, {
    message: VALIDATION_MAIL.MAIL.listEmails.MAX,
  })
  listEmails: emailStudentDto[];
}

class emailStudentDto {
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
}
