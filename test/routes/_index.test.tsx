import { ReactTestingLibrary, renderComponent } from '@kurocado-studio/qa';
import React from 'react';

import Index from '../../app/routes/_index';

const { screen } = ReactTestingLibrary;

describe('Welcome component', () => {
  beforeEach(() => renderComponent(<Index />));

  test('renders main route properly', () => {
    expect(
      screen.getByText('Kurocado Studio Remix starter template'),
    ).toBeInTheDocument();
  });
});
