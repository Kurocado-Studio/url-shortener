import { ReactTestingLibrary } from '@kurocado-studio/qa';
import * as remix from '@remix-run/react';
import { createRemixStub } from '@remix-run/testing';
import React from 'react';

import Index from '../../app/routes/_index';

const { render, waitFor, screen } = ReactTestingLibrary;

vi.mock('@remix-run/react', async () => ({
  ...(await vi.importActual('@remix-run/react')),
  useNavigation: vi.fn(),
  useActionData: vi.fn(),
}));

const renderRemixStub = async (): Promise<void> => {
  const RemixStub = createRemixStub([
    {
      path: '/',
      Component: Index,
      loader() {
        return Response.json('Hello, world!');
      },
    },
  ]);

  render(<RemixStub />);

  await waitFor(() =>
    expect(screen.getByTestId(/url-shortener-route/i)).toBeInTheDocument(),
  );
};

describe('Index Component', () => {
  const inputName: RegExp = /Enter URL to shorten/i;

  beforeEach(async () => {
    vi.restoreAllMocks();

    remix.useNavigation.mockReturnValue({ state: 'idle' });
    // @ts-expect-error on unknown typed value
    remix.useActionData.mockReturnValue(null);
  });

  it('renders the form with an a11y friendly input', async () => {
    await renderRemixStub();

    expect(screen.getByLabelText(inputName)).toBeInTheDocument();
    expect(screen.getByRole('input', { name: inputName })).toBeInTheDocument();
  });

  it('disables the URL input when submitting', async () => {
    remix.useNavigation.mockReturnValue({ state: 'submitting' });
    await renderRemixStub();
    expect(screen.getByRole('input', { name: inputName })).toBeDisabled();
  });

  it('displays the shortened URL when action data is provided', async () => {
    const shortenedUrl = new Date().toISOString();

    // @ts-expect-error on unknown typed value
    remix.useActionData.mockReturnValue({ shortenedUrl });

    Object.defineProperty(window, 'location', {
      value: { origin: 'http://127.0.0.1' },
      writable: true,
    });

    await renderRemixStub();

    const link = screen.getByRole('link', {
      name: shortenedUrl,
    });

    expect(link).toHaveAttribute('href', `http://127.0.0.1/${shortenedUrl}`);
  });
});
