import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @Get()
  async getData() {
    try {
      return await this.appService.getData();
    } catch (error) {
      console.log(error);
      throw error; 
    }
  }
}
