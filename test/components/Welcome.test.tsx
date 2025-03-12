import { ReactTestingLibrary, renderComponent } from '@kurocado-studio/qa';
import React from 'react';

import { Welcome } from 'app/components/Welcome';

const { screen } = ReactTestingLibrary;

describe('Welcome component', () => {
  beforeEach(() => renderComponent(<Welcome />));

  test('renders welcome component properly', () => {
    expect(
      screen.getByText('Kurocado Studio Remix starter template'),
    ).toBeInTheDocument();
  });

  test('renders a tag pointing to the YouTrack documentation', () => {
    const linkElement = screen.getByRole('link', { name: 'Learn more' });

    expect(linkElement).toBeInTheDocument();

    expect(linkElement).toHaveAttribute(
      'href',
      'https://kurocado.youtrack.cloud/articles/STY-A-3/Overview',
    );
  });

  test('renders a tag pointing to the GitHub repository', () => {
    const linkElement = screen.getByRole('link', { name: 'View on GitHub' });

    expect(linkElement).toBeInTheDocument();

    expect(linkElement).toHaveAttribute(
      'href',
      'https://github.com/Kurocado-Studio/styleguide-remix-template',
    );
  });
});
