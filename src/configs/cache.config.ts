import { CacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-ioredis';
import * as config from 'config';

const redisConfig = config.cache;

export const cacheConfig: CacheModule = {
  store: redisStore,
  host: redisConfig.host,
  port: redisConfig.port,
};
