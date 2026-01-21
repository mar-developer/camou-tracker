import Redis from 'ioredis';

let redisClient: Redis | null = null;
let useCache = false;

export function initCache() {
  try {
    const redisUrl = process.env.REDIS_URL;
    
    if (redisUrl) {
      redisClient = new Redis(redisUrl, {
        maxRetriesPerRequest: 3,
        retryStrategy(times) {
          const delay = Math.min(times * 50, 2000);
          return delay;
        },
      });
      
      redisClient.on('connect', () => {
        console.log('Redis connected');
        useCache = true;
      });
      
      redisClient.on('error', (error) => {
        console.error('Redis error, falling back to no cache:', error.message);
        useCache = false;
        redisClient = null;
      });
    }
  } catch (error) {
    console.warn('Cache disabled:', error);
    useCache = false;
  }
}

export async function getCache<T>(key: string): Promise<T | null> {
  if (!useCache || !redisClient) return null;
  
  try {
    const cached = await redisClient.get(key);
    if (cached) {
      return JSON.parse(cached) as T;
    }
  } catch (error) {
    console.error('Cache get error:', error);
  }
  
  return null;
}

export async function setCache(
  key: string,
  value: any,
  ttl: number = 3600
): Promise<boolean> {
  if (!useCache || !redisClient) return false;
  
  try {
    await redisClient.setex(key, ttl, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Cache set error:', error);
    return false;
  }
}

export async function deleteCache(key: string): Promise<boolean> {
  if (!useCache || !redisClient) return false;
  
  try {
    await redisClient.del(key);
    return true;
  } catch (error) {
    console.error('Cache delete error:', error);
    return false;
  }
}

export async function deleteCachePattern(pattern: string): Promise<number> {
  if (!useCache || !redisClient) return 0;
  
  try {
    const keys = await redisClient.keys(pattern);
    if (keys.length > 0) {
      await redisClient.del(...keys);
    }
    return keys.length;
  } catch (error) {
    console.error('Cache delete pattern error:', error);
    return 0;
  }
}

export async function incrementCache(key: string): Promise<number> {
  if (!useCache || !redisClient) return 0;
  
  try {
    return await redisClient.incr(key);
  } catch (error) {
    console.error('Cache increment error:', error);
    return 0;
  }
}

export async function getOrSetCache<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttl: number = 3600
): Promise<T> {
  const cached = await getCache<T>(key);
  if (cached !== null) {
    return cached;
  }
  
  const data = await fetchFn();
  await setCache(key, data, ttl);
  return data;
}

export function isCacheEnabled(): boolean {
  return useCache;
}

export async function closeCache(): Promise<void> {
  if (redisClient) {
    await redisClient.quit();
    redisClient = null;
    useCache = false;
  }
}

initCache();
