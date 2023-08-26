export interface CacheItem {
    expiry: number;
    data: any;
  }
  
  const CACHE_TIME = 10 * 60 * 1000;
  const cache: Record<string, CacheItem> = {};
  
  export function setCache(key: string, data: any): void {
    const expiry = Date.now() + CACHE_TIME;
    cache[key] = { expiry, data };
  }
  
  export function getCache(key: string): any | null {
    const item = cache[key];
  
    if (!item) {
      return null;
    }
  
    if (Date.now() > item.expiry) {
      delete cache[key];
      return null;
    }
  
    return item.data;
  }
  