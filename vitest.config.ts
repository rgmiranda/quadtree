import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    setupFiles: ['vitest-canvas-mock'],
    environment: 'jsdom',
    // For this config, check https://github.com/vitest-dev/vitest/issues/740
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
    include: ['tests/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      provider: 'v8'
    }
  },
})