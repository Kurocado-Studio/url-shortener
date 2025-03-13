/* eslint unicorn/filename-case: 0 */
/* eslint import/no-default-export: 0 */
import type { LoaderFunction, LoaderFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { get } from 'lodash-es';
import React from 'react';

import { urlService } from '../domain/service';

export const loader: LoaderFunction = async (options: LoaderFunctionArgs) => {
  const shortCode = get(options, ['params', 'shortCode']);
  const urlPayload = await urlService.getUrl(shortCode);
  if (urlPayload) {
    return redirect(urlPayload.originalUrl);
  }
  throw new Response('URL not found', { status: 404 });
};

export default function ShortCodeRedirect(): React.ReactNode {
  return <div>Redirecting...</div>;
}
