import type { Url } from './models';

export interface UrlPayload {
  shortenedUrl: string;
  originalUrl: string;
}

export interface UrlRepository {
  createUrl: (url: UrlPayload) => Promise<Url>;
  readUrl: (shortenedUrl: string) => Promise<Url | null>;
}

export interface UrlService {
  createUrl: (url: string) => Promise<UrlPayload | null>;
  getUrl: (shortenedUrl: string) => Promise<UrlPayload | null>;
}
