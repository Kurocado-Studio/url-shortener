import { isURL } from 'class-validator';

import type { UrlRepository } from './types';

type ValidateUrlFormat = (originalUrl: string) => asserts originalUrl is string;

export const validateUrlFormat: ValidateUrlFormat = (originalUrl) => {
  if (typeof originalUrl === 'string' && isURL(originalUrl)) return;
  throw new Error('Invalid URL');
};

export const validateShortenedUrlDoesNotExist = async (
  value: string,
  readUrl: UrlRepository['readUrl'],
): Promise<void> => {
  const urlPayload = await readUrl(value);

  if (urlPayload === null) {
    return;
  }

  throw new Error('Url exist');
};
