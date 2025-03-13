import type { UrlPayload } from './types';

export class Url implements UrlPayload {
  shortenedUrl: string;
  originalUrl: string;

  private constructor(payload: UrlPayload) {
    this.shortenedUrl = payload.shortenedUrl;
    this.originalUrl = payload.originalUrl;
  }

  public static create = (payload: UrlPayload): UrlPayload => {
    return new Url(payload);
  };
}
