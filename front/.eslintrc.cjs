require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
  },

  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: "module",
    parserOptions: { tsconfigRootDir: __dirname },
  },

  settings: {
    react: {
      version: "detect", // 사용자가 설치한 버전을 자동으로 선택
    },
  },

  plugins: ["react", "react-refresh", "jsx-a11y"],
  extends: [
    //  "@rushstack/eslint-config/profile/web-app",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
    // "plugin:@tanstack/eslint-plugin-query/recommended"
  ],

  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
