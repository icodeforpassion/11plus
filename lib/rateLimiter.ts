import LRU from 'lru-cache';

const limiter = new LRU<string, { count: number; expires: number }>({ max: 5000 });

export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const entry = limiter.get(key);
  if (entry && entry.expires > now) {
    if (entry.count >= limit) {
      return false;
    }
    entry.count += 1;
    limiter.set(key, entry);
    return true;
  }
  limiter.set(key, { count: 1, expires: now + windowMs });
  return true;
}
