
import tsParser from "@typescript-eslint/parser"
import tseslint from "@typescript-eslint/eslint-plugin"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import importPlugin from "eslint-plugin-import"
import jsxA11y from "eslint-plugin-jsx-a11y"
import prettierPlugin from "eslint-plugin-prettier"
// eslint.config.ts
import path from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


export default [
  {
    ignores: ["node_modules", "dist","vite.config.ts"],

    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      react,
      "react-hooks": reactHooks,
      import: importPlugin,
      "jsx-a11y": jsxA11y,
      prettier: prettierPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        node: {
          paths: [path.resolve(__dirname, "")],
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
    // env: {
    //   node: true,
    // },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-no-target-blank": "warn",
      "prettier/prettier": [
        "warn",
        {
          arrowParens: "always",
          semi: false,
          trailingComma: "none",
          tabWidth: 2,
          endOfLine: "auto",
          useTabs: false,
          singleQuote: true,
          printWidth: 120,
          jsxSingleQuote: true,
        },
      ],
    },
  },
]
