import { type Mock } from 'vitest';
import { mock } from 'vitest-mock-extended';

import * as Repository from 'app/domain/repository';
import type { RedisUrlRepo } from 'app/domain/repository';
import { urlService } from 'app/domain/service';
import type { UrlService } from 'app/domain/types';
import * as Variants from 'app/domain/variants';

import { Url } from '../../app/domain/models';

vi.mock('app/domain/variants', () => ({
  validateShortenedUrlDoesNotExist: vi.fn(),
  validateUrlFormat: vi.fn(),
}));

vi.mock('app/domain/repository', async () => ({
  urlRepository: mock<RedisUrlRepo>(),
  generateRandomString: vi.fn(),
}));

describe('urlService', () => {
  const TEST_URL = 'http://localhost';
  let service: UrlService;
  let mockGenerateRandomString: Mock<typeof Repository.generateRandomString>;

  beforeEach(() => {
    vi.resetAllMocks();

    service = urlService;
    mockGenerateRandomString = Repository.generateRandomString as Mock;
  });

  describe('createUrl', () => {
    beforeEach(() => {
      mockGenerateRandomString.mockReturnValue('RANDOM_STRING');
    });

    it('should call validateUrlFormat', async () => {
      await service.createUrl('');
      expect(Variants.validateUrlFormat).toHaveBeenCalledWith('');
    });

    it('should call generateRandomString', async () => {
      await service.createUrl(TEST_URL);
      expect(Repository.generateRandomString).toHaveBeenCalled();
    });

    it('should call validateShortenedUrlDoesNotExist', async () => {
      await service.createUrl(TEST_URL);

      expect(Variants.validateShortenedUrlDoesNotExist).toHaveBeenCalledWith(
        'RANDOM_STRING',
        service.getUrl,
      );
    });

    it('should call urlRepository.createUrl', async () => {
      await service.createUrl(TEST_URL);

      expect(Repository.urlRepository.createUrl).toHaveBeenCalledWith({
        originalUrl: TEST_URL,
        shortenedUrl: 'RANDOM_STRING',
      });
    });

    it('should return the value of urlRepository.createUrl', async () => {
      const urlPayload = Url.create({
        shortenedUrl: 'shortenedUrl_TEST',
        originalUrl: 'originalUrl_TEST',
      });

      // @ts-expect-error mocking
      Repository.urlRepository.createUrl.mockReturnValue(
        Url.create(urlPayload),
      );

      expect(await service.createUrl(TEST_URL)).toEqual(urlPayload);
    });
  });

  describe('getUrl', () => {
    it('should call urlRepository.createUrl', async () => {
      await service.getUrl(TEST_URL);

      expect(Repository.urlRepository.readUrl).toHaveBeenCalledWith(TEST_URL);
    });

    it('should return the value of urlRepository.readUrl', async () => {
      const urlPayload = Url.create({
        shortenedUrl: 'shortenedUrl_TEST',
        originalUrl: 'originalUrl_TEST',
      });

      // @ts-expect-error mocking
      Repository.urlRepository.readUrl.mockReturnValue(urlPayload);

      expect(await service.getUrl(TEST_URL)).toEqual(urlPayload);
    });
  });
});
