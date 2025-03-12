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
import type { MetaFunction } from '@remix-run/node';
import React from 'react';

import { Welcome } from '../components/Welcome';

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

export default function Index(): React.ReactNode {
  return <Welcome />;
}
