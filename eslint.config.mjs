import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import stylistic from "@stylistic/eslint-plugin";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  stylistic.configs.recommended,
  react.configs.flat.recommended,
  reactHooks.configs.flat.recommended,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      "@stylistic/semi": [2, "always"],
      "@stylistic/quotes": [2, "double"],
      "@stylistic/no-multiple-empty-lines": "error",
      "react/react-in-jsx-scope": "off",
    },
  },
]);

export default eslintConfig;
