// @ts-check

// /** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
/** @type {import("prettier").Config} */
const config = {
  endOfLine: 'lf',
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'es5',
  useTabs: false,
  tabWidth: 2,
  // importOrder: [
  //   '^(react/(.*)$)|^(react$)',
  //   '<BUILTIN_MODULES>',
  //   '<THIRD_PARTY_MODULES>',
  //   '',
  //   '^types$',
  //   '^@/types/(.*)$',
  //   '^@/config/(.*)$',
  //   '^@/lib/(.*)$',
  //   '^@/hooks/(.*)$',
  //   '^@/components/ui/(.*)$',
  //   '^@/components/(.*)$',
  //   '^@/schemas/(.*)$',
  //   '^@/mocks/(.*)$',
  //   '',
  //   '^@/assets/(.*)$',
  //   '^@/icons/(.*)$',
  //   '',
  //   '^@/layouts/(.*)$',
  //   '^@/routes/(.*)$',
  //   '^@/pages/(.*)$',
  //   '',
  //   '^[./]',
  // ],
  // importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  // importOrderTypeScriptVersion: '5.3.3',
  plugins: [
    // 'prettier-plugin-tailwindcss',
    // '@ianvs/prettier-plugin-sort-imports',
  ],
};

module.exports = config;
