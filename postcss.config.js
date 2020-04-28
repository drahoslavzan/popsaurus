const tailwindcss = require("tailwindcss");
const purgecss = require("postcss-purgecss");
const replace = require("postcss-replace");
const cssnano = require("cssnano");

// NOTE: dangerous - replacing units from 'rem' -> 'em'
const replaceConfig = replace({
  pattern: 'rem',
  data: {
    replaceAll: 'em'
  }
});

const postCssConfig = purgecss({
  content: [
    "./src/**/*.html",
    "./src/**/*.tsx",
    "./src/**/*.ts",
    "./src/**/*.js",
    "./src/**/*.jsx"
  ],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
});

const cssnanoConfig = cssnano({
  preset: [
    "default",
    {
      discardComments: {
        removeAll: true
      }
    }
  ]
});

module.exports = {
  plugins: [
    tailwindcss("./tailwind.config.js"),
	require("autoprefixer"),
	replaceConfig,
    ...(process.env.NODE_ENV === "production"
      ? [postCssConfig, cssnanoConfig]
      : [])
  ]
};