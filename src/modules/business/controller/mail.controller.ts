import { Body, Controller, Post, Headers } from '@nestjs/common';
import { MailBusinessService } from '../../service/services/mail-business.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MailSentDto } from '../dto/mail-sent.dto';
import { MailCallBackDto } from '../dto/mail-callback.dto';

@Controller('mail')
@ApiTags('[API] Mail')
export class MailController {
  constructor(private readonly mailBusinessService: MailBusinessService) {}

  @Post('callback')
  @ApiOkResponse({
    type: MailCallBackDto,
    description: 'Send data',
  })
  async callBack(@Body() body: MailCallBackDto) {
    console.log(body);
  }
  @Post('sent-data')
  @ApiOkResponse({
    type: MailSentDto,
    description: 'Send data',
  })
  async sendData(@Body() body: MailSentDto, @Headers() headers) {
    await this.mailBusinessService.sendData(body, headers);
  }
}
