module.exports = {
"presets": ['@babel/preset-env',
           {
        "exclude": ["transform-regenerator"]
      }
           ],

  "env": {
    "test": {
      "plugins": ["@babel/plugin-transform-modules-commonjs"]
    }
  }
}
