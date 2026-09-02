import eslint from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

const nodeTypeScriptFiles = [
  "apps/api/src/**/*.ts",
  "apps/media-worker/src/**/*.ts",
  "packages/*/src/**/*.ts",
];

export default tseslint.config(
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/dist/**",
      "**/build/**",
      "**/coverage/**",
      "**/.turbo/**",
      "**/*.tsbuildinfo",
      "docs/**",
    ],
  },

  {
    ...eslint.configs.recommended,
    files: nodeTypeScriptFiles,
  },

  ...tseslint.configs.recommendedTypeChecked.map((config) => ({
    ...config,
    files: nodeTypeScriptFiles,
  })),

  {
    files: nodeTypeScriptFiles,

    languageOptions: {
      globals: {
        ...globals.node,
      },

      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },

    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],

      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/require-await": "error",
    },
  },
);
