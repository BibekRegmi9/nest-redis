import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { RedisOptions } from './configs/app-options.constants';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';


@Module({
  imports: [
    CacheModule.register({isGlobal: true}),
    CacheModule.registerAsync(RedisOptions),
  ],
  
  controllers: [AppController],
  providers: [
    AppService,
    {
      // Binding the interceptor globally
      provide: APP_INTERCEPTOR, 
      useClass: CacheInterceptor,
    }
  ],
})
export class AppModule {}
