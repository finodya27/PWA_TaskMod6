import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin"; // Corrected import for the TypeScript ESLint plugin
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser, // Use browser globals in environments
      parser: "@typescript-eslint/parser", // Specify the TypeScript parser
      parserOptions: {
        ecmaVersion: 2020, // Use ECMAScript 2020 features
        sourceType: "module", // Allow the use of imports
        ecmaFeatures: {
          jsx: true, // Enable JSX support
        },
      },
    },
    rules: {
      // Add any custom rules here
      "react/react-in-jsx-scope": "off", // Next.js doesn't require React in scope
      // You can add more rules based on your requirements
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];
