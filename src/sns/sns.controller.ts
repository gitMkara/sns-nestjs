import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Res,
  Post,
  Req,
} from '@nestjs/common';
import { SNSService } from './sns.service';

@Controller('sns')
export class SNSController {
  constructor(private snsService: SNSService) {}

  @Post('/sub')
  async getSubscribe(@Req() req, @Res() res: any) {
    const body = req.body;
    await this.snsService.getSubs(body);
    return res.status(HttpStatus.OK).json('subs completed' + res);
  }

  @Post('/pub')
  async getPublish(@Req() req, @Res() res: any) {
    const body = req.body;
    await this.snsService.getPub(body);
    return res.status(HttpStatus.OK).json('Message send' + res);
  }

  @Get('/list')
  async getList(@Res() res: any) {
    const list = await this.snsService.getList();
    return res.status(HttpStatus.OK).json(list);
  }
}
