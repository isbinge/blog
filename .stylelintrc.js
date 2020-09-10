module.exports = {
    extends: [
      'stylelint-config-standard',
      'stylelint-config-css-modules',
      'stylelint-config-rational-order',
      'stylelint-config-prettier',
    ],
    plugins: [
      'stylelint-order',
      'stylelint-declaration-block-no-ignored-properties',
      'stylelint-scss',
    ],
    rules: {
      // 'selector-class-pattern': '^[a-z][a-zA-Z0-9]+$',
      'plugin/declaration-block-no-ignored-properties': true,
      'no-descending-specificity': null,
      'declaration-empty-line-before': null,
      // "indentation":
    },
  };