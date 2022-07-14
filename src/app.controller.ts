import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get()
  home() {
    return '나의 영화 API에 온걸 환영한다.';
  }
}
