import { createClient } from 'redis';

import { Url } from './models';
import type { UrlPayload, UrlRepository } from './types';

const redis = await createClient({ url: import.meta.env.VITE_REDIS_URL });
await redis.connect();

const CHAR_SET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const generateRandomString = (length: number = 6): string => {
  const getRandomChar = (): string => {
    const randomNumberWithinRange = Math.random() * CHAR_SET.length;
    const roundedNumber = Math.floor(randomNumberWithinRange);

    return CHAR_SET.charAt(roundedNumber);
  };

  return Array.from({ length }, getRandomChar).join('');
};

export class RedisUrlRepo implements UrlRepository {
  public static appendUrl = (url: string): string => `ulr:${url}`;

  createUrl: UrlRepository['createUrl'] = async (payload) => {
    const urlPayload = Url.create(payload);
    const key = RedisUrlRepo.appendUrl(payload.shortenedUrl);

    await redis.set(key, JSON.stringify(urlPayload));

    return urlPayload;
  };

  readUrl: UrlRepository['readUrl'] = async (shortenedUrl) => {
    const key = RedisUrlRepo.appendUrl(shortenedUrl);

    const urlJson = await redis.get<string>(key);

    if (!urlJson) return null;
    const parsedUrlPayload: UrlPayload = JSON.parse(urlJson);

    return Url.create(parsedUrlPayload);
  };
}

export const urlRepository = new RedisUrlRepo();
