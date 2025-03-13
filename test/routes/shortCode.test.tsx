// tests/shortCodeRedirect.loader.mock.test.ts
import * as RemixNode from '@remix-run/node';
import { expect, vi } from 'vitest';

import * as service from 'app/domain/service';
import { loader } from 'app/routes/$shortCode';

vi.mock('app/domain/service', async () => ({
  ...(await vi.importActual('@remix-run/node')),
  urlService: vi.fn(),
}));
vi.mock('@remix-run/node', async () => ({
  ...(await vi.importActual('@remix-run/node')),
  redirect: vi.fn(),
}));

describe('ShortCodeRedirect loader (with mocks)', () => {
  const shortCode = 'abc123';

  beforeEach(() => {
    vi.resetAllMocks();
    service.urlService.getUrl = vi.fn();
  });

  it('calls urlService.getUrl with right params', async () => {
    const loaderArgs = { params: { shortCode } };

    // @ts-expect-error during mocking
    service.urlService.getUrl.mockResolvedValue({ originalUrl: '' });

    await loader(loaderArgs);

    expect(service.urlService.getUrl).toHaveBeenCalledWith(shortCode);
  });

  it('redirects to the original URL if urlService.getUrl returns a payload', async () => {
    const originalUrl = 'https://example.com';

    // @ts-expect-error during mocking
    service.urlService.getUrl.mockResolvedValue({ originalUrl });

    const loaderArgs = { params: { shortCode } };
    await loader(loaderArgs);

    expect(RemixNode.redirect).toHaveBeenCalledWith(originalUrl);
  });

  it('throws a 404 Response if urlService.getUrl returns null', async () => {
    // @ts-expect-error during mocking
    service.urlService.getUrl.mockResolvedValue(null);

    const loaderArgs = { params: { shortCode } };

    try {
      await loader(loaderArgs);
      throw new Error('Loader did not throw as expected');
    } catch (error) {
      expect(error).toBeInstanceOf(Response);
      expect((error as Response).status).toBe(404);
    }
  });
});
