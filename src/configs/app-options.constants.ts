import { CacheModuleAsyncOptions } from "@nestjs/cache-manager";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { redisStore } from "cache-manager-redis-store";

export const RedisOptions: CacheModuleAsyncOptions = {
    isGlobal: true,
    imports: [ConfigModule.forRoot()],
    useFactory: async (configService: ConfigService) => {
      const store = await redisStore({
        socket: {
          port: +process.env.REDIS_PORT,
          host: process.env.REDIS_HOST,
          // port: 6379,
          // host: 'localhost'
        },
      });
      return {
        store: () => store,
      };
    },
    inject: [ConfigService],
  };