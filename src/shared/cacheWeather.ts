export interface CacheItem {
  expiry: number;
  data: any;
}

const CACHE_TIME = 1 * 60 * 1000; 
const cache: Record<string, CacheItem> = {};

export function setCache(key: string, data: any): void {
  const expiry = Date.now() + CACHE_TIME;
  cache[key] = { expiry, data };

  localStorage.setItem(key, JSON.stringify({ expiry, data }));
}

export function getCache(key: string): any | null {
  let item = cache[key];

  if (!item) {
    const stored = localStorage.getItem(key);
    if (stored) {
      item = JSON.parse(stored);
      cache[key] = item; 
    }
  }

  if (!item) {
    return null;
  }

  if (Date.now() > item.expiry) {
    delete cache[key];
    localStorage.removeItem(key);
    return null;
  }

  return item.data;
}
