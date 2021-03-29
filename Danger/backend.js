const { dangerJsCommon } = require('./common');
const { getLabelIssues } = require('./helpers');

function checkForVersionUpdate() {
  const packageChanged = danger.git.modified_files.includes('package.json');
  const lockfileChanged = danger.git.modified_files.includes(
    'package-lock.json'
  );

  if (packageChanged) return;
  if (packageChanged && !lockfileChanged) {
    issues.push(
      `Changes were made to \`package.json\`, but not to \`package-lock.json\` - Perhaps you need to run \`npm i\``
    );
  }

  issues.push(
    `Please ensure the package version has been bumped in accordance with [Semantic Versioning](https://semver.org/)\n and run \`npm i\` to update \`package-lock.json\` \n`
  );
}

const dangerJs = () => {
  const labelIssues = getLabelIssues('backend')
  dangerJsCommon(labelIssues);
  checkForVersionUpdate();
}

module.exports = {
  dangerJs,
}