module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  extends: [
    "expo",
    "prettier",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "warn",
  },
};
