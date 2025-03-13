/**
 * Made with ❤️ and adobo by Kurocado Studio
 * Copyright (c) 2024. All Rights Reserved.
 *
 * Learn more about Kurocado Studio: {@link https://www.kurocado.studio}
 *
 * Explore our open-source projects: {@link https://github.com/kurocado-studio}
 */
/* eslint unicorn/filename-case: 0 */
/* eslint import/no-default-export: 0 */
import type {
  ActionFunction,
  ActionFunctionArgs,
  MetaFunction,
} from '@remix-run/node';
import { Form, useActionData, useNavigation } from '@remix-run/react';
import React from 'react';

import { urlService } from '../domain/service';
import type { UrlPayload } from '../domain/types';

export const meta: MetaFunction = () => {
  return [
    { title: 'Kurocado Studio Remix starter template' },
    {
      name: 'description',
      content:
        'A structured approach to writing scalable, and maintainable TypeScript code for modern web applications',
    },
  ];
};

export const action: ActionFunction = async (
  payload: ActionFunctionArgs,
): Promise<Response> => {
  try {
    const { request } = payload;
    const formData = await request.formData();
    const originalUrl = formData.get('url');

    const url = await urlService.createUrl(originalUrl);
    return Response.json(url);
  } catch (e) {
    return Response.json(e, { status: 500 });
  }
};

export default function Index(): React.ReactNode {
  const actionData = useActionData<UrlPayload>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const shortenedUrl = actionData?.shortenedUrl
    ? `${window.location.origin}/${actionData.shortenedUrl}`
    : null;

  return (
    <main className='animate-appear w-full max-w-6xl mt-24 overflow-hidden rounded-3xl bg-white shadow-2xl'>
      <article className='p-16'>
        {/*@ts-expect-error type mismatch on Form component*/}
        <Form method='post'>
          <label
            className='block mb-4 font-display text-2xl font-medium tracking-tight [text-wrap:balance] lg:text-3xl'
            htmlFor='url'
          >
            Enter URL to shorten
          </label>
          <input
            type='url'
            name='url'
            id='url'
            disabled={isSubmitting}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            placeholder='https://example.com'
            required
          />
        </Form>
      </article>
      {shortenedUrl && !isSubmitting ? (
        <div className='bg-gray-50 px-16 py-4'>
          <h2>Shortened URL:</h2>
          <a href={shortenedUrl}>{shortenedUrl}</a>
        </div>
      ) : null}
    </main>
  );
}
