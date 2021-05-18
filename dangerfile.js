/**
 * DangerJS does not allow for the packages to be imported inside the Capmo Config
 * Unfortunately this is completely ignored at runtime and needs to be imported in
 * the dangerfile. To overcome this we import Danger in the local dangerfile of each
 * Repository and disable no-unused-vars for the single line.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { fail, danger } = require('danger');
const { dangerJs } = require('./dangerjs');

const options = {
  platform: 'backend',
};

dangerJs(options);