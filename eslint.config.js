import path from 'path'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import importPlugin from 'eslint-plugin-import'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import prettier from 'eslint-plugin-prettier'
import globals from 'globals' // ✅ thêm globals

export default tseslint.config({
  ignores: ['node_modules', 'dist'],

  files: ['**/*.{js,jsx,ts,tsx}'],

  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      ecmaFeatures: { jsx: true }
    },
    globals: {
      ...globals.node // ✅ tương đương với env.node = true
    }
  },

  plugins: {
    react,
    'react-hooks': reactHooks,
    import: importPlugin,
    'jsx-a11y': jsxA11y,
    prettier,
    '@typescript-eslint': tseslint.plugin
  },

  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      node: {
        paths: [path.resolve()],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },

  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-no-target-blank': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'prettier/prettier': [
      'warn',
      {
        arrowParens: 'always',
        semi: false,
        trailingComma: 'none',
        tabWidth: 2,
        endOfLine: 'auto',
        useTabs: false,
        singleQuote: true,
        printWidth: 120,
        jsxSingleQuote: true,
        plugins: ['prettier-plugin-tailwindcss']
      }
    ]
  }
})
