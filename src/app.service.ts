import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager'; 
import { CreateDataDto } from './dtos/create-data.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AppService {
  constructor(
    
    @Inject(CACHE_MANAGER) private cacheManager: Cache){}

  getHello(): string {
    return 'Hello World!';
  }

  async getData() {
    // To Retrieve data from the cache
    const value = await this.cacheManager.get<string>('key'); 
    return value;
  }

  async postData(createDataDto: CreateDataDto){
    const {value} = createDataDto;
    //  To Set data in the cache
    await this.cacheManager.set('key', value); 
  }

  async deleteData(){
    // To Delete data from the cache
    await this.cacheManager.del('key'); 
  }


  // // Cache Implementation Example
  // async getPokemon(id: number): Promise<string> {
  //   // check if data is in cache:
  //   const cachedData = await this.cacheManager.get<{ name: string }>(
  //     id.toString(),
  //   );
  //   if (cachedData) {
  //     console.log(`Getting data from cache!`);
  //     return `${cachedData.name}`;
  //   }

  //   // if not, call API and set the cache:
  //   const { data } = await this.httpService.axiosRef.get(
  //     `https://pokeapi.co/api/v2/pokemon/${id}`,
  //   );
  //   await this.cacheManager.set(id.toString(), data);
  //   return await `${data.name}`;
  // }

 

}
