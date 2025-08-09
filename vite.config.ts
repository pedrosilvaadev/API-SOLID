import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    dir: './src',
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          dir: 'src/use-cases'
        }
      },
      {
        extends: true,
        test: {
          name: 'e2e',
          dir: 'src/http/controllers',
          environment: './prisma/vite-environment-prisma/prisma-test-environment.ts'
        }
      }
    ],
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage',
      all: false,
      include: ['src/use-cases/**/*.ts', 'src/repositories/**/*.ts'],
      exclude: [
        'src/env/**',
        'src/http/**',
        'src/lib/**',
        'src/server.ts',
        'src/main.ts',
        'generated/**',
        'node_modules/**',
        '**/*.d.ts',
        '**/*.map',
      ],
    },
  },
})
