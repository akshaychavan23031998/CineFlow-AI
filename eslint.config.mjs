import eslint from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

const nodeSourceTypeScriptFiles = [
  "apps/api/src/**/*.ts",
  "apps/media-worker/src/**/*.ts",
  "packages/*/src/**/*.ts",
];

const nodeTestTypeScriptFiles = ["apps/api/test/**/*.ts"];

const nodeTypeScriptFiles = [...nodeSourceTypeScriptFiles, ...nodeTestTypeScriptFiles];

const strictTypeScriptRules = {
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
};

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
    files: nodeSourceTypeScriptFiles,

    languageOptions: {
      globals: {
        ...globals.node,
      },

      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },

    rules: strictTypeScriptRules,
  },

  {
    files: nodeTestTypeScriptFiles,

    languageOptions: {
      globals: {
        ...globals.node,
      },

      parserOptions: {
        project: ["./apps/api/tsconfig.test.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },

    rules: strictTypeScriptRules,
  },
);
