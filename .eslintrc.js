module.exports = {
  "extends": [
    "prettier",
    "plugin:react/recommended",
    "plugin:flowtype/recommended"
  ],
  "parser": "babel-eslint",
  "env": {
    "browser": true
  },
  "plugins": [
    "prettier",
    "react",
    "flowtype"
  ],
  "rules": {
    "new-cap": 0,
    "no-unused-vars": "error"
  }
};
