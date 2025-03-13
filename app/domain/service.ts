import { generateRandomString, urlRepository } from './repository';
import type { UrlService } from './types';
import {
  validateShortenedUrlDoesNotExist,
  validateUrlFormat,
} from './variants';

export class VercelUrlService implements UrlService {
  createUrl: UrlService['createUrl'] = async (originalUrl) => {
    validateUrlFormat(originalUrl);

    const shortenedUrl = generateRandomString();

    await validateShortenedUrlDoesNotExist(shortenedUrl, this.getUrl);

    return urlRepository.createUrl({ shortenedUrl, originalUrl });
  };

  getUrl: UrlService['getUrl'] = async (shortenedUrl) => {
    return urlRepository.readUrl(shortenedUrl);
  };
}

export const urlService = new VercelUrlService();
