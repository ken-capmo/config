const eslintConfig = {
	"parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json",
    "sourceType": "module",
    "createDefaultProgram": true
  },
  "plugins": [
    "@typescript-eslint",
    "prettier"
  ],
  "extends": [
    "airbnb-typescript/base", /* Enable if using without React */
    // "airbnb-typescript", /* Enable if using with React */
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint", // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    "plugin:prettier/recommended", // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    "prettier"
  ],
  "env": {
    "node": true,
    "browser": true,
    "jest": true
  },
  "rules": {
    // Allows us to safely disable semi-colons: https://github.com/olliahonen/should-i-use-semicolons-ts
    "no-unexpected-multiline": 1,
    // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
    "no-prototype-builtins": "off",
    // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
    "import/prefer-default-export": "off",
    "import/no-default-export": "error",
    "no-use-before-define": [
      "error",
      { "functions": false, "classes": true, "variables": true
      }
    ],
    // Makes no sense to allow type inferrence for expression parameters, but require typing the response
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      { "allowExpressions": true, "allowTypedFunctionExpressions": true
      }
    ],
    "@typescript-eslint/no-use-before-define": [
      "error",
      { "functions": false, "classes": true, "variables": true, "typedefs": true
      }
    ]
  }
}

module.exports = {
  eslintConfig
}
