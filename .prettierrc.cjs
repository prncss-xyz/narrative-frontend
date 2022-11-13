module.exports = {
  organizeImportsSkipDestructiveCodeActions: true,
  // autoload do not work with pnpm, see https://github.com/prettier/prettier/pull/13583
  plugins: [require("prettier-plugin-organize-imports")],
};
