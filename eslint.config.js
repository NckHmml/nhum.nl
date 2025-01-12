import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import tseslintParser from "@typescript-eslint/parser";
import stylistic from "@stylistic/eslint-plugin";

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
