/* eslint import/no-default-export: 0 */
/* eslint import/no-cycle: 0 */
import { viteWebConfig } from '@kurocado-studio/styleguide';
import { defineConfig } from 'vite';

export default defineConfig({
  ...viteWebConfig,
  server: {
    // mostly to allow CodeSandbox URLs
    allowedHosts: true,
  },
  optimizeDeps: {
    include: ['@remix-run/react'],
  },
});
