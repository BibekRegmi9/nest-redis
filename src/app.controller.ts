import { Body, Controller, Delete, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateDataDto } from './dtos/create-data.dto';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // Automatically cache the response for this endpoint
  @UseInterceptors(CacheInterceptor) 
  getHello(): string {
    return this.appService.getHello();
  }


  @Get()
  @UseInterceptors(CacheInterceptor) 
  // Controlling the key
  @CacheKey('custom_key')
  // Controlling the duration
  @CacheTTL(20)
  async getData() {
    try {
      return await this.appService.getData();
    } catch (error) {
      console.log(error);
      throw error; 
    }
  }


  // @UseInterceptors(CacheInterceptor) // Automatically cache the response for this endpoint
  // @Get('/:id')
  // async getPokemon(@Param('id') id: number): Promise<string> {
  //   return await this.appService.getPokemon(+id);
  // }

  @Post()
  async postData(@Body() createDataDto: CreateDataDto){
    try {
      return this.appService.postData(createDataDto)
    } catch (error) {
      console.log(error);
      throw error; 
    }
  }

  @Delete()
  async deleteData(){
    try {
      return this.appService.deleteData()
    } catch (error) {
      console.log(error);
      throw error; 
    }
  }
}
