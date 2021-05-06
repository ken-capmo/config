# config

Basic, extendable configuration for Product and Engineering team

## Overview

This serves as a basic configuration to standardise all our repositories. The styling makes use of the following technologies

- [Prettier](https://prettier.io/) - For styling the code
- [EditorConfig](https://editorconfig.org/) - To ensure all editors use the same rules
- [ESLint](https://eslint.org/docs/) - For linting our code to avoid using bad practices and is based on the [Airbnb](https://github.com/airbnb/javascript) styleguide.
- [DangerJS](https://danger.systems/js) - To ensure Pull Requests are created correctly.

# Linting and Styling

## Setup

ESLint

Create a new `.eslintrc.js` file in the root of the project

```
const { eslintConfig } = require('@capmo/config');

module.exports = {
 ...eslintConfig
// --- Uncomment for projects without React
// "extends": [ "airbnb-typescript/base" ]
// --- Uncomment for projects with React
// "extends": [ "airbnb-typescript" ]
};
```

Prettier

Create a `.prettierrc.js` file in the root of the project with the following code

```
const { prettierConfig } = require('@capmo/config');

module.exports = { ...prettierConfig };
```

To setup the styling copy the files from the provided directory. There are separate configs and installs for project with and without React.

Install the base package:

```javascript
npm install eslint-config-airbnb-typescript --save-dev
```

### With React

```javascript
npm install eslint-plugin-import@^2.22.0 \
            eslint-plugin-jsx-a11y@^6.3.1 \
            eslint-plugin-react@^7.20.3 \
            eslint-plugin-react-hooks@^4.0.8 \
            @typescript-eslint/eslint-plugin@^4.4.1 \
            --save-dev

Add "extends": ["airbnb-typescript"] to your ESLint config file.
```

### Without React

```javascript
npm install eslint-plugin-import@^2.22.0 \
            @typescript-eslint/eslint-plugin@^4.4.1 \
            --save-dev

Add "extends": ["airbnb-typescript/base"] to the ESLint config File
```

# Danger.js

## Setup

1. Install @capmo/config package
2. Create a dangerfile in the root of the repo with the following content:

```
/**
 * DangerJS does not allow for the packages to be imported inside the Capmo Config
 * Unfortunately this is completely ignored at runtime and needs to be imported in
 * the dangerfile. To overcome this we import Danger in the local dangerfile of each
 * Repository and disable no-unused-vars for the single line.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { fail, danger } = require('danger');
const { dangerJs } = require('@capmo/config');

const options = {
  platform: 'backend',
};

dangerJs(options);
```

The above-mentioned dangerfile is a general one which can be generally used in any regular code repository.

1. Add the following to the circleci config:

```
- run:
  name: Install Danger
  command: |
  npm install danger
- run:
  name: Run Danger
  command: |
  npx danger ci
```

### Possible options
| Option            | Default   | Type                        | Description                                                   |
| :---------------- | :-------- | :-------------------------- | :------------------------------------------------------------ |
| platform          | 'default' | 'backend', 'webb', 'mobile' | Used to specify the platform for labeling                     |
| versionValidation | true      | Boolean                     | Determine whether or not we should check the package versions |
| sizeLimit         | 1000      | Number                      | Maximum number of lines changes allowed                       |
