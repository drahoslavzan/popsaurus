const tailwindcss = require("tailwindcss");
const purgecss = require("postcss-purgecss");
const cssnano = require("cssnano");

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
    ...(process.env.NODE_ENV === "production"
      ? [postCssConfig, cssnanoConfig]
      : [])
  ]
};