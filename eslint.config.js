import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import tseslintParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tseslintParser,
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        sourceType: "module",
      },
    },
    plugins: {
      "stylistic": stylistic,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "import": importPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/array-type": ["error", { default: "generic" }],
      "@typescript-eslint/explicit-member-accessibility": ["error", { accessibility: "explicit" }],
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/indent": "off",
      "@typescript-eslint/member-ordering": "off",
      "@typescript-eslint/naming-convention": ["error",
        { selector: "default", format: ["camelCase", "PascalCase"], leadingUnderscore: "allow" },
        { selector: "variable", format: ["camelCase", "PascalCase", "UPPER_CASE"], leadingUnderscore: "allow" },
        { selector: "typeLike", format: ["PascalCase"] },
        { selector: "enumMember", format: ["PascalCase"] },
        { selector: "property", format: null, leadingUnderscore: "allow" },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-require-imports": "error",
      "@typescript-eslint/no-unused-expressions": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "all",
          ignoreRestSiblings: true,
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-var-requires": "error",
      "@typescript-eslint/prefer-namespace-keyword": "error",
      "@typescript-eslint/strict-boolean-expressions": [
        "error",
        {
          allowString: true,
          allowNumber: true,
          allowNullableBoolean: true,
          allowNullableString: true,
          allowNullableNumber: true,
          allowNullableEnum: true,
        },
      ],
      "array-bracket-spacing": "error",
      "arrow-parens": ["error", "always"],
      "arrow-spacing": "error",
      "brace-style": ["off", "off"],
      "comma-dangle": ["error", "always-multiline"],
      "comma-spacing": "error",
      "computed-property-spacing": "error",
      "id-match": "error",
      "import/order": ["error", {
        "newlines-between": "always",
        "distinctGroup": true,
        "alphabetize": {
          order: "asc",
          caseInsensitive: true,
        },
        "pathGroups": [
          {
            pattern: "{./*,.}",
            group: "internal",
            position: "before",
          },
          {
            pattern: "~/components/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "~/pages/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "~/redux/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "~/**",
            group: "internal",
            position: "after",
          },
        ],
        "pathGroupsExcludedImportTypes": [],
      }],
      "indent": ["error", 2, {
        SwitchCase: 1,
        FunctionDeclaration: { body: 1, parameters: 2 },
        flatTernaryExpressions: true,
      }],
      "key-spacing": "error",
      "keyword-spacing": "error",
      "no-console": ["warn", { allow: ["error"] }],
      "no-eval": "error",
      "no-extra-boolean-cast": "off",
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1, maxBOF: 0 }],
      "no-nested-ternary": "warn",
      "no-param-reassign": "off",
      "no-restricted-imports": ["error", {
        patterns: [{
          group: ["..*"],
          message: "Use non-relative imports that start with `~/`",
        }],
        patterns: [{
          regex: "^\\.\\/[^\\/]*\\/",
          message: "Use non-relative imports that start with `~/`",
        }],
      }],
      "no-trailing-spaces": "error",
      "no-underscore-dangle": "off",
      "no-unused-vars": "off",
      "stylistic/member-delimiter-style": ["error",
        {
          multiline: {
            delimiter: "semi",
            requireLast: true,
          },
          singleline: {
            delimiter: "semi",
            requireLast: false,
          },
        },
      ],
      "stylistic/quotes": ["error", "double", { avoidEscape: true }],
      "stylistic/semi": ["error", "always"],
      "stylistic/type-annotation-spacing": "error",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
);
