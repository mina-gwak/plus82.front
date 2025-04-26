import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import eslint from '@eslint/js'
import fsdPlugin from 'eslint-plugin-fsd-lint'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const config = [
  {
    ignores: ['.next/*', 'node_modules/*', '!src/**/*'],
  },
  eslint.configs.recommended,
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:storybook/recommended',
    'prettier',
  ),
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    settings: {
      react: {
        version: '19.0.0',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/no-internal-modules': 'off',
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'no-multiple-empty-lines': 'warn',
      'no-var': 'error',
      'no-duplicate-case': 'error',
      'padding-line-between-statements': [
        'warn',
        {
          blankLine: 'always',
          prev: '*',
          next: 'return',
        },
      ],
      eqeqeq: ['warn', 'always'],
      'arrow-parens': ['warn', 'as-needed'],
      'arrow-spacing': 'warn',
      'prefer-destructuring': 'warn',
      'react/jsx-curly-brace-presence': 'warn',
      'react/prop-types': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      'react/self-closing-comp': [
        'warn',
        {
          component: true,
          html: true,
        },
      ],
      'react/destructuring-assignment': 'warn',
      'react/jsx-no-useless-fragment': 'warn',
      'react/jsx-key': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-shadow': 'warn',
      '@typescript-eslint/no-duplicate-enum-values': 'off',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'index'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
        },
      ],
    },
  },
  {
    plugins: {
      fsd: fsdPlugin,
    },
    rules: {
      'fsd/forbidden-imports': 'error',
      'fsd/no-public-api-sidestep': 'error',
      'fsd/no-cross-slice-dependency': 'error',
      'fsd/no-ui-in-business-logic': 'error',
      'fsd/no-global-store-imports': 'error',
      'fsd/ordered-imports': 'warn',
    },
  },
]

export default config
