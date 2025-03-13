import { describe, vi } from 'vitest';

import { Url } from 'app/domain/models';
import { urlRepository } from 'app/domain/repository';
import type { UrlPayload } from 'app/domain/types';

const mocks = vi.hoisted(() => {
  return {
    set: vi.fn(),
    get: vi.fn(),
    connect: vi.fn(),
  };
});

vi.mock('redis', async () => {
  return {
    ...(await vi.importActual('redis')),
    createClient: vi.fn().mockResolvedValue(mocks),
  };
});

describe('RedisUrlRepo', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('createUrl', () => {
    it('should call redis.set with the correct key', async () => {
      const payload: UrlPayload = {
        shortenedUrl: 'abc123',
        originalUrl: 'https://example.com',
      };

      const expectedKey = `url:${payload.shortenedUrl}`;

      mocks.set.mockResolvedValue(Url.create(payload));

      const result = await urlRepository.createUrl(payload);

      expect(mocks.set).toHaveBeenCalledWith(
        expectedKey,
        JSON.stringify(result),
      );
    });

    it('should return the result of persisted data', async () => {
      const payload: UrlPayload = {
        shortenedUrl: new Date().toISOString(),
        originalUrl: 'https://example.com',
      };
      mocks.set.mockResolvedValue(Url.create(payload));
      const result = await urlRepository.createUrl(payload);
      expect(result).toEqual(payload);
    });
  });

  describe('readUrl', () => {
    it('should return null when readUrl finds no data', async () => {
      const shortenedUrl = 'abc123';
      const expectedKey = `url:${shortenedUrl}`;
      mocks.get.mockResolvedValue(null);

      const result = await urlRepository.readUrl(shortenedUrl);
      expect(result).toBeNull();
      expect(mocks.get).toHaveBeenCalledWith(expectedKey);
    });

    it('should return null when readUrl finds no data', async () => {
      const shortenedUrl = 'abc123';

      mocks.get.mockResolvedValue(null);

      const result = await urlRepository.readUrl(shortenedUrl);
      expect(result).toBeNull();
    });

    it('should return a URL payload when redis.get returns valid JSON', async () => {
      const payload: UrlPayload = {
        shortenedUrl: 'abc123',
        originalUrl: 'https://example.com',
      };

      const jsonUrlPayload = JSON.stringify({
        ...payload,
        originalUrl: new Date().toISOString(),
      });

      mocks.get.mockResolvedValue(jsonUrlPayload);

      const result = await urlRepository.readUrl(payload.shortenedUrl);

      expect(result).toEqual(JSON.parse(jsonUrlPayload));
    });
  });
});
