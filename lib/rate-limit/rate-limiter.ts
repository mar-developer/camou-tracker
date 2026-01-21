import { getCache, setCache, incrementCache, deleteCachePattern } from '@/lib/cache/cache';
import { RATE_LIMITS } from '@/lib/constants';

interface RateLimitCheck {
  allowed: boolean;
  remaining: number;
  resetTime: Date;
}

export async function checkRateLimit(
  userId: string,
  endpoint: string
): Promise<RateLimitCheck> {
  const limit = RATE_LIMITS[endpoint as keyof typeof RATE_LIMITS] || RATE_LIMITS.api;
  const key = `rate_limit:${userId}:${endpoint}`;
  const windowKey = `rate_limit_window:${userId}:${endpoint}:${Math.floor(Date.now() / limit.window)}`;
  
  const cached = await getCache<{ count: number; windowStart: number }>(key);
  const windowStart = cached?.windowStart || Date.now();
  
  if (cached && Date.now() - windowStart < limit.window) {
    const count = cached.count + 1;
    
    if (count <= limit.requests) {
      await setCache(
        key,
        { count, windowStart },
        Math.ceil(limit.window / 1000)
      );
      
      return {
        allowed: true,
        remaining: limit.requests - count,
        resetTime: new Date(windowStart + limit.window),
      };
    }
    
    return {
      allowed: false,
      remaining: 0,
      resetTime: new Date(windowStart + limit.window),
    };
  }
  
  const newWindowStart = Date.now();
  await setCache(
    key,
    { count: 1, windowStart: newWindowStart },
    Math.ceil(limit.window / 1000)
  );
  
  return {
    allowed: true,
    remaining: limit.requests - 1,
    resetTime: new Date(newWindowStart + limit.window),
  };
}

export async function resetRateLimit(userId: string, endpoint: string): Promise<void> {
  const key = `rate_limit:${userId}:${endpoint}`;
  await deleteCachePattern(key);
}

export async function getRateLimitHeaders(
  userId: string,
  endpoint: string
): Promise<Record<string, string>> {
  const limit = RATE_LIMITS[endpoint as keyof typeof RATE_LIMITS] || RATE_LIMITS.api;
  const result = await checkRateLimit(userId, endpoint);
  
  return {
    'X-RateLimit-Limit': limit.requests.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': Math.floor(result.resetTime.getTime() / 1000).toString(),
  };
}

export function isRateLimited(result: RateLimitCheck): boolean {
  return !result.allowed;
}

export function getRetryAfter(result: RateLimitCheck): number {
  return Math.max(0, Math.ceil((result.resetTime.getTime() - Date.now()) / 1000));
}
