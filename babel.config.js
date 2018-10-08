/*
{
  "presets": [
    "env",
    "es2015",
    "stage-0",
    "stage-2",
    "react"
  ],
  "plugins": [
      "transform-runtime",
      "transform-object-assign",
      "transform-object-rest-spread"
  ]
}
*/


module.exports = function (api) {
  api.cache(true);

  const presets = [
    "@babel/preset-env",
    "@babel/preset-react"
  ];
  const plugins = [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-transform-runtime",
  ];

  return {
    presets,
    plugins
  };
}