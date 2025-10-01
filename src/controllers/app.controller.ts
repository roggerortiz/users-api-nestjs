import { format } from '@formkit/tempo';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  get() {
    return {
      success: true,
      msg: `This is a sample response - ${format(new Date(), 'YYYY-MM-DD HH:mm:ss')}`,
    };
  }
}
