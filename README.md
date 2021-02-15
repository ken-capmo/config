# config
Basic, extendable configuration for Product and Engineering team


# Linting and Styling

## Overview

This serves as a basic configuration to standardise all our repositories. The styling makes use of the following technologies

  * [Prettier](https://prettier.io/) - For styling the code
  * [EditorConfig](https://editorconfig.org/) - To ensure all editors use the same rules
  * [ESLint](https://eslint.org/docs/) - For linting our code to avoid using bad practices and is based on the [Airbnb](https://github.com/airbnb/javascript) styleguide.

## Setup 

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

